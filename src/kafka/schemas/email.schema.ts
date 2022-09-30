import { Type } from 'avsc';

export const JobSchema = Type.forSchema({
  type: 'record',
  name: 'email',
  fields: [
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'jobId',
      type: 'string',
    },
  ],
});
