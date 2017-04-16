class ContainerController < ApplicationController
	def root
	end
	def data
		l_retval = Hash.new
		l_retval['ClientTimestamp'] = Request["clienttimestamp"]
		l_retval['DummyParameter'] = Request["clienttimestamp"]
		l_retval['ServerTimestamp'] = Time.now.getutc
		render json: l_retval
	end
	def data2
		l_retval = Hash.new
		l_retval['ClientTimestamp'] = params["clienttimestamp"]
		l_retval['DummyParameter'] = params["clienttimestamp"]
		l_retval['ServerTimestamp'] = Time.now.getutc
		render json: l_retval
	end
end
