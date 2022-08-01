import React from "react";

class Delete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
    }

    handleSubmit =  (event) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": document.getElementById('ID').value
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://52.71.40.127/api/product/delete", requestOptions)
            .then((res) => res.json)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

    }






    render() {
        return (
            <div className="auth-wrapper">
                <div className="card auth-inner">
                    <div>
                        <div className="table-responsive px-md-4 px-2 pt-3">
                            <form action="" method="delete" onSubmit={this.handleSubmit}>


                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="id"
                                        id="ID"
                                        className="form-control"
                                        placeholder="id"
                                        ref={node => (this.inputNode = node)}

                                    />
                                </div>


                                <br/>
                                <div className="d-flex ">

                                    <a type="button" className="ov-btn-slide-bottom" href="/dashboard">
                                        Cancel
                                    </a>


                                    {/*<a type="button" className="btn btn-success ms-auto" onClick={() => {}}>*/}
                                    {/*  Save*/}
                                    {/*</a>*/}
                                    <a type="button"   >
                                        <button href="/dashboard"className="ov-btn-slide-bottom">
                                            Submit
                                        </button>
                                    </a>
                                </div>
                            </form>
                            <p>Despues de guardar regrese ala pagina anterior para visualizar los cambios</p>
                            <a href="/dashboard" className="ov-btn-grow-ellipse">Regresar</a>
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default Delete;