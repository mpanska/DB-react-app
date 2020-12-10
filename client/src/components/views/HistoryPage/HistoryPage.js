import React from 'react'

function HistoryPage(props) {

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Historia zakupów</h1>
            </div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Towar</th>
                        <th>Cena</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {props.user.userData && props.user.userData.history &&
                        props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.dateOfPurchase}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
