class APIError extends Error{
    constructor( //initialise and declaring
          statuscode,
          message="something went wrong",
          errors=[],
          stack=""
    ){
        super(message)      //override
        this.statuscode=statuscode
        this.data=null
        this.message=message
        this.success=null
        this.errors=errors
        if (stack) {
            this.stack=stack
        } else {
            Error.captureStackTrace(this,this.constructor)  //decides which can first tracck
        }
    }
}