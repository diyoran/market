import React, { Fragment, useState, useEffect } from 'react'
import Cart from "../components/Cart";
import axios from 'axios';

const Home = () => {
    const [Products, setProducts] = useState([]);

    const RequestGet = async (path) => {
        path = "http://localhost:9000" + path
        await axios.get(path).then(response => {
            const data = response.data;
            setProducts(() => data ? [...data] : [])
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        try {
            RequestGet("/product")
        } catch (error) {
            alert(error?.message);
        }
    }, [])

    const product = Products.map(product => {
        return <Cart
            key={product.id}
            id={product.id}
            price={product.price}
            title={product.title}
            image={product.image}
        />
    });

    return (
        <Fragment>
            <section>
                <div className="Container">
                    <h2 className="title-2">Магазин</h2>

                    <div className="main__row">
                        {product}
                    </div>

                    <div className="main__paginations">
                        <button className={`pagination active`}>1</button>
                        <button className="pagination">2</button>
                        <button className="pagination">3</button>
                        <button className="pagination">4</button>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Home