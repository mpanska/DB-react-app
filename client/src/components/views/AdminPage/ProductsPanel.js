import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Button, Form, Input, Collapse, Typography } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import { categories, price } from '../LandingPage/Sections/Datas';
import SearchFeature from '../LandingPage/Sections/SearchFeature';
import { updateProduct } from "../../../_actions/product_actions";
import FileUpload from '../../utils/FileUpload';
import { Formik } from 'formik';
import { useDispatch } from "react-redux";

const { Meta } = Card;
const { TextArea } = Input;
const { Panel } = Collapse


const Categories = [ 
    { key: 1, value: "Artykuły higieniczne" }, 
    { key: 2, value: "Twarz" }, 
    { key: 3, value: "Włosy" }, 
    { key: 4, value: "Makijaż" },
    { key: 5, value: "Perfumy" },
    { key: 6, value: "Ciało" },
    { key: 7, value: "Inne" }
]


function ProductsPanel() {
    const dispatch = useDispatch();

    const [Products, setProducts] = useState([])
    const [SearchTerms, setSearchTerms] = useState("")
    const [PriceValue, setPriceValue] = useState() 
    const [CategoryValue, setCategoryValue] = useState()
    const [Images, setImages] = useState()

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }
    const onCategoriesSelectChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
 
//---------------------------------------------- EDIT FUN------------------------------------    
    function editProduct(id) {
        return (
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                let dataToSubmit = {
                  title: values.title,
                  description: values.description,
                  price: PriceValue,
                  categories: CategoryValue,
                  images: Images, 
                };

                dispatch(updateProduct(dataToSubmit, id)).then(response => {
                  if (response.payload.success) {
                    alert('Edytowano produkt')
                    window.location.reload();
                  } else {
                    alert("Edycja Zakończona")
                    window.location.reload();
                  }
                })
                setSubmitting(false);
              }, 500);
            }}
          >
            
            {props => {
              const {
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <div>
                  <Form style={{maxWidth: '450px'}}  onSubmit={handleSubmit} >
                    <Form.Item label="Nazwa">
                      <Input
                        id="title"
                        placeholder="Nazwa"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>
                    < br/>
                    <Form.Item label="Opis towaru">
                    <TextArea
                        id="description"
                        placeholder="Opis"
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>

                    <Form.Item label="Cena">
                    <Input
                        onChange={onPriceChange}
                        value={PriceValue}
                        type="number"
                    />
                    </Form.Item>
                    
                    <Form.Item label="Kategoria">
                        <select onChange={onCategoriesSelectChange} value={CategoryValue}>
                            {Categories.map(item => (
                                <option key={item.key} value={item.key}>{item.value} </option>
                            ))}
                        </select>
                    </Form.Item>
                    
                    <Form.Item label="Załącz nowy obraz">
                        <FileUpload refreshFunction={updateImages} />
                    </Form.Item>

                
                    <Form.Item>
                      <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                        Zapisz zmiany
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              );
            }}
          </Formik>
        );
    };


    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                  setProducts(response.data.products)
                    
                } else {
                    alert('Nie udało się pobrać dane produktu')
                }
            })
    }


    const renderCards = Products.map((product, index) => {
        const deleteProduct = event => {
            event.preventDefault();
              Axios.delete(`/api/product/${product._id}`)
                .then(res => {
                  alert(`Usunięto produkt ${product.title} o id ${product._id}`)
                  console.log(res);
                  console.log(res.data);
                  window.location.reload();
          })
        }

        return <Col lg={8} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                />
                <br /><br />
                <p>Id : {product._id}</p>
                <p>Cena : {product.price}</p>
                <p>Sprzedano jednostek : {product.sold}</p>
                <p>Numer kategorii : {product.categories}</p>
                <Button onClick={deleteProduct}>Usuń</Button>
                <br /><br />
                  <Collapse style={{textAlign: 'center'}}>
                    <Panel header="Edytuj" > 
                      {editProduct(product._id)}
                    </Panel>
                  </Collapse> 
            </Card>
        </Col>
    })


    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            searchTerm: newSearchTerm
        }
     
        setSearchTerms(newSearchTerm)
        getProducts(variables)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1> Zarządzanie produktami </h1>
            </div>

            <div style={{ margin: '1rem auto', width: '500px', height: '50px'}}>
                <SearchFeature  refreshFunction={updateSearchTerms} />
            </div>

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Nie znaleziono żadnych artykułów</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
        
        </div>
    )
}

export default ProductsPanel
