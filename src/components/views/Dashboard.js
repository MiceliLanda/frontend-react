import { useEffect,useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import Form from "../../utilities/Forms";
import "../../assets/scss/boton.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    fetch("http://52.71.40.127/api/product/view")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              setProductos(result)
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
  }, [])




  if (error) {
    return <div>Erro: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {


    const renderProducto = () => {

      return (

          <tbody>


          {

            productos.map((producto, index) => (

                <tr>

                  <th scope="row"></th>
                  <td>{producto.id}</td>
                  <td>{producto.name}</td>
                  <td>{producto.nameProduc}</td>
                  <td>{producto.description}</td>
                  <td>{producto.price}</td>
                  <td>{producto.amount}</td>


                  <td>
                    <div className="d-flex align-items-center">
                      <span className="pe-3 text-muted"></span>
                      <span className="pe-3"></span>
                      <div className="col-sm-3">
                        <a
                            type="button"
                            className="ov-btn-grow-skew"
                            href="/edit-product"
                        >
                          Edit
                        </a>
                      </div>
                      <div className="col-sm-3">
                        <a
                            type="button"
                            className="ov-btn-grow-skew"

                            href="/delete-product"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
            ))
          }
          </tbody>
      );
    };
    return (

        <table className="table table-striped">
          <thead>
          <tr>
            <br/><br/>
            <div className="d-flex">
              <a type="button" className="ov-btn-grow-skew" href="/create-product">
                Add new product
              </a>
            </div>
            <th scope="col">id</th>

            <th scope="col">name</th>
            <th scope="col">-name-product-</th>
            <th scope="col">description</th>
            <th scope="col">price</th>
            <th scope="col">amount</th>

          </tr>
          </thead>
          {renderProducto()}
        </table>
    );
  }
  ;
}

export default Dashboard;
