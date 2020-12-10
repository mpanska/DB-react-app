import React, { Component } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

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

export class UploadProductPage extends Component {

    state = {
        title: '',
        description: '',
        categories: 1, 
        images: [],
        price: 0
    }

    handleChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value })
    }

    handleChangePrice = (event) => {
        this.setState({ price: parseInt(event.currentTarget.value, 10) })
    }

    handleChangeDecsription = (event) => {
        this.setState({ description: event.currentTarget.value })
    }

    handleChangeCategories = (event) => {
        this.setState({ categories: event.currentTarget.value })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Wymagane logowanie')
        }

        if (!this.state.title || !this.state.description ||
            !this.state.categories || !this.state.images || !this.state.price) {
            return alert('Trzeba wypełnić wszystkie pola')
        }

        const variables = {
            writer: this.props.user.userData._id,
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            categories: this.state.categories,
            price: this.state.price
        }

        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Dodano nowy produkt')
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 1000);
                } else {
                    alert('Wystąpił błąd w trakcie dodania produktu')
                }
            })
    }

    updateFiles = (newImages) => {
        this.setState({ images: newImages })
    }


    render() {
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Dodaj nowy produkt </Title>
            </div>

            <Form onSubmit={this.onSubmit}>
               
               <FileUpload refreshFunction={this.updateFiles} />

                <br /><br />
                <label>Nazwa</label>
                <Input
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />
                <br /><br />
                <label>Opis</label>
                <TextArea
                    onChange={this.handleChangeDecsription}
                    value={this.state.description}
                />
                <br /><br />
                <label>Cena</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.price}
                />
                <br /><br />
                <select onChange={this.handleChangeCategories}> 
                    {Categories.map(item => ( 
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={this.onSubmit}>
                    Dodaj produkt
                </Button>
            </Form>
        </div>
        )
    }
}

export default UploadProductPage
