class ApiResponse{
    constructor(
        statuscode,
        data,
        message="success"
    ){
        this.statuscode=statuscode  //override
        this.data=data
        this.message=message
        this.success=statuscode<400
    }
}