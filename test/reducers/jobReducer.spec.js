import expect from 'expect'
import jobReducer from '../../src/reducers/jobReducer';
import {
  ADD_JOB,
  REMOVE_JOB,
  UPDATE_JOB,
  GET_JOBS,
  GET_JOB_DETAILS,
  requestJobs,
  REQUEST_JOBS,
  addJob,
  removeJob,
  updateJob,
  getJobDetails,
  requestJobDetails
}
from '../../src/actions/jobAction';

describe('jobReducer', () => {
  afterEach(() => {
    jobReducer(undefined, {
      type: 'CLEAR'
    });
  })
  it('can get a default state', () => {
    var res = jobReducer(undefined, {
      type: GET_JOBS
    });

    expect(res).toExist();
    expect(res.jobs.length).toBe(0);
    expect(res.jobDic).toExist();
  });

  it('can add a job', () => {
    var jobA = createJob();
    jobA.id = 'fake';
    var res = jobReducer(undefined, jobA);
    expect(res.jobs.length).toBe(1);
    expect(res.jobDic['fake']).toExist();
  });

  it('can remove a job', () => {

    var jobA = addJob('url', 'title', 'description');
    jobA.id = 'fake';
    var res = jobReducer(undefined, jobA);

    var res = jobReducer(undefined, {
      type: GET_JOBS
    });
    expect(res.jobDic['fake']).toNotExist();
  });

  it('can update a job ', () => {
    var jobA = createJob();
    jobA.id = 'fake';
    var res = jobReducer(undefined, jobA);

    expect(res.jobDic['fake'].midiTitle).toBe('title');

    res = jobReducer(res, updateJob('fake', 'title', 'newtitle'));
    res = jobReducer(res, updateJob('fake', 'description', 'newdescription'));
    res = jobReducer(res, updateJob('fake', 'url', 'newurl'));

    expect(res.jobDic['fake']).toExist();
    expect(res.jobDic['fake'].midiTitle).toBe('newtitle');
    expect(res.jobDic['fake'].midiDescription).toBe('newdescription');
    expect(res.jobDic['fake'].midiLink).toBe('newurl');

  });

  it('can get all jobs', () => {
    var res = jobReducer(undefined, {});
    var jobs = [];
    for (var i = 0; i < 10; i++) {
      var jobA = addJob('url', 'title', 'description');
      jobA.id = 'fake' + i;
      jobs.push(jobA);
    }

    res = jobReducer(res, {
      type: GET_JOBS,
      jobs: jobs
    });
    expect(res.jobs.length).toBe(10);
  });

  function createJob() {
    return addJob({
      midiLink: 'url',
      midiTitle: 'title',
      midiDescription: 'description'
    });
  }
  it('can get job details', () => {
    var jobA = createJob();
    jobA.id = 'fake';
    var res = jobReducer(undefined, jobA);
    res = jobReducer(res, getJobDetails('fake', ['ajsdlfas']));

    expect(res.currentJobDetails).toExist();
    expect(res.currentJobDetails.length).toBe(1);
  });

  it('can request jobs', () => {
    var request = requestJobs();
    var res = jobReducer(undefined, request);
    expect(res.isRequesting).toBe(true);
  });

  it('can initiate request for new log', () => {

    var request = requestJobDetails();
    var res = jobReducer(undefined, request);
    expect(res.isRequestingCurrent).toBe(true);
  })
});
