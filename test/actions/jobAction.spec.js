import expect from 'expect'
import {  ADD_JOB,
  REMOVE_JOB,
  UPDATE_JOB,
  REQUEST_JOBS,
  GET_JOBS,
  GET_JOB_DETAILS,
  addJob,
  getJobs,
  requestJobs,
  removeJob,
  updateJob,
  getJobDetails,
  getJobsAsync
  } from '../../src/actions/jobAction';

describe('jobReducer', () => {

	it('get job details', ()=>{
		 var res = getJobDetails('id', []);
		 expect(res.type).toExist();
		 expect(res.type).toBe(GET_JOB_DETAILS);
		 expect(res.id).toBe('id');
	});

	it('get jobs', ()=>{
		 var res = getJobs();
		 expect(res.type).toExist();
		 expect(res.type).toBe(GET_JOBS);
	});

	it('updateJob', ()=>{
		 var res = updateJob();
		 expect(res.type).toExist();
		 expect(res.type).toBe(UPDATE_JOB);
	});

	it('removeJob', ()=>{
		 var res = removeJob();
		 expect(res.type).toExist();
		 expect(res.type).toBe(REMOVE_JOB);
	});

	it('addJob', ()=>{
		 var res = addJob({});
		 expect(res.type).toExist();
		 expect(res.type).toBe(ADD_JOB);
	});

	it('request jobs', ()=>{
		var res = requestJobs();
		expect(res.type).toExist();
		expect(res.type).toBe(REQUEST_JOBS);
	})

	it('get jobs async', (done)=>{
		var dispatchCalled = false
		getJobsAsync()(function(res){
			dispatchCalled = true;
			return res;
		}).then(function(res) {
			expect(dispatchCalled).toBe(true);
		}).catch(x=>{
			console.log('something went wrong');
			console.log(x);
			// expect('this went bad').toBe('asd');
		}).then(done);

	});
});
