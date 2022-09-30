import { Job } from '@prisma/client';
import axios from 'axios';
import { JobUpdate } from '../interfaces';

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const createJob = async (plan: number): Promise<Job> => {
    const { job } = (await api.post('emails', { plan })).data;
    return job;
}

export const getJob = async (jobId: string): Promise<Job> => {
    const job = (await api.get(`jobs/${jobId}`)).data;
    console.log('jet job -> ', job);
    return job;
}

export const getJobStatus = async (jobId: string): Promise<JobUpdate> => {
    const job = (await api.get(`jobs/status/${jobId}`)).data;
    return job;
}
