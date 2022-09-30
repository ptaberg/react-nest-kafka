import { Job, JobStatus } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createJob, getJob, getJobStatus } from "./api";
import { JobDisplay } from "./components/JobDisplay";
import { useInterval } from "./hooks/useInterval";
import { FormInputs } from "./interfaces";

export const App = () => {
  const [currentJob, setJob] = useState<Job>()
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      plan: 0,
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async ({ plan }) => {
    try {
      const job = await createJob(plan);
      setJob(job);
      localStorage.setItem('jobId', job.id);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const getCurrentJob = async () => {
      const jobId = localStorage.getItem('jobId');
      if (jobId) {
        const job = await getJob(jobId);
        setJob(job);
      }
    }

    getCurrentJob();
  }, [])

  const queryJobUpdate = useCallback(async () => {
    if (currentJob?.id && currentJob.status === JobStatus.PROGRESS) {
      const { sent, status } = await getJobStatus(currentJob.id);
      // @ts-ignore
      setJob((job) => ({
          ...job,
          sent,
          status,
        }
      ))
    }
  }, [currentJob]);

  useInterval(queryJobUpdate, 1200, Boolean(currentJob?.id && currentJob.status === JobStatus.PROGRESS))

  return (
    <div className="App">
      <div className="m-6 w-100">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="plan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Plan emails to job</label>
        <input type="number" id="plan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required {...register('plan')}/>
      </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Send</button>
      </form>
      <JobDisplay job={currentJob} />
      </div>
    </div>
  );
}
