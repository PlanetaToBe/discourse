# name: tobe_field_onebox
# about: to.be field onebox
# version: 0.1
# authors: to.be

require 'oneboxer'

class Oneboxer::ToBeFieldOnebox < Oneboxer::BaseOnebox

  matcher /^https?:\/\/(?:www\.)?to\.be\/fields\/\S+$/

  def onebox
    # "<iframe src='#{@url}' style='border-width:0' frameborder='0' scrolling='no' width='100%' height='400px'></iframe>"
    "<a target='_blank' href='#{@url}'>" +
      "<img src='#{@url}/snapshot' style='max-width:100%;' />" +
    "</a>"
  end

end

Oneboxer.add_onebox "Oneboxer::ToBeFieldOnebox".constantize
