class ContainerController < ApplicationController
	def root
	end
	def data
		l_retval = Hash.new
		l_retval['Caption'] = "This is the Caption Text"
		l_retval['URL'] = "htt://www.google.com"
		render json: l_retval
	end
end
