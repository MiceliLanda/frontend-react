import React, {useState} from "react";

class CreateProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit =  (event) => {
        const myInput = document.getElementById('files');

        var formdata = new FormData();
        formdata.append("nameProduc", document.getElementById('ProductName').value);
        formdata.append("name",  myInput.files[0], myInput.files[0].values);
        console.log( myInput.files[0])
        formdata.append("description", document.getElementById('description').value);
        formdata.append("price", document.getElementById('price').value);
        formdata.append("amount", document.getElementById('amount').value);

        event.preventDefault()

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        }
        fetch("http://52.71.40.127/api/product/create", requestOptions)
            .then((res) => res.json)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    }



    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }


    render() {
        return (
            <div className="auth-wrapper">
                <div className="card auth-inner">
                    <div>
                        <div className="table-responsive px-md-4 px-2 pt-3">
                            <form action="" method="post" onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <img
                                        src={this.state.file}
                                        className="w-25 h-auto rounded mx-auto d-block"
                                        alt="product"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="file" name="files" id="files" className="form-control" src="" alt=""
                                           onChange={this.handleChange}
                                           ref={node => (this.inputNode = node)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        id="ProductName"
                                        className="form-control"
                                        placeholder="Product name"
                                        ref={node => (this.inputNode = node)}

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Description"
                                        ref={node => (this.inputNode = node)}

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                        ref={node => (this.inputNode = node)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        className="form-control"
                                        placeholder="Stock"
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
                                    <a type="button"  >
                                        <button href="/dashboard" className="ov-btn-slide-bottom" >
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


export default CreateProduct;

