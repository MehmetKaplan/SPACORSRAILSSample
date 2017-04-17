class ContainerController < ApplicationController
	skip_before_action :verify_authenticity_token, only: [:datapost]
 	def root
	end
	def datapost
		l_retval = Hash.new
		l_retval['ClientTimestamp'] = Request["ClientTimestamp"]
		l_retval['DummyParameter'] = Request["DummyParameter"]
		l_retval['ServerTimestamp'] = Time.now.getutc
		render json: l_retval
	end
	def dataget
		l_retval = Hash.new
		l_retval['ClientTimestamp'] = params["ClientTimestamp"]
		l_retval['DummyParameter'] = params["DummyParameter"]
		l_retval['ServerTimestamp'] = Time.now.getutc
		render json: l_retval
	end
end
