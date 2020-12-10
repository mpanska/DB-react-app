import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Categories = [ 
    { key: 1, value: "Artykuły higieniczne" }, 
    { key: 2, value: "Twarz" }, 
    { key: 3, value: "Włosy" }, 
    { key: 4, value: "Makijaż" },
    { key: 5, value: "Perfumy" },
    { key: 6, value: "Ciało" },
    { key: 7, value: "Inne" }
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0) 
    const [CategoryValue, setCategoryValue] = useState(1)
    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCategoriesSelectChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !CategoryValue || !Images) {
            return alert('Wszystkie pola muszą być wypełnione')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            categories: CategoryValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Dodano nowy produkt')
                    props.history.push('/')
                } else {
                    alert('Wystąpił błąd w trakcie dodania produktu')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2}> Wprowadź dane nowego produktu</Title>
            </div>

            <Form onSubmit={onSubmit} >
                <label>Nazwa</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Opis towaru</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />

                <label>Cena</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />

                <label>Kategoria</label><br />
                <select onChange={onCategoriesSelectChange} value={CategoryValue}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br /><br />

                <label>Zalącz obraz towaru</label><br />
                <FileUpload refreshFunction={updateImages} />

                <br /><br /><br />

                <Button onClick={onSubmit}>Publikuj towar</Button>
                <br /><br />
                <br /><br />
            </Form >
        </div>
    )
}

export default UploadProductPage
