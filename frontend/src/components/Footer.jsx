import React from 'react'
import '../UserCss/Footer.css'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg='4' md='4' sm='12' >
                        <div className='logo footer__logo'>
                            <h1 style={{color:'white'}}>HOMES.COM</h1>
                        </div>
                        <p className='footer__logo-content' style={{marginTop:'2rem'}}>
                          <b>Our vision is to make all
                            people the best place to
                            live for them.</b>
                        </p>
                    </Col>
                    <Col lg='2' md='4' sm='6'>
                        <div className='mb-4' >
                            <h5 className="footer__link-title">Services We Provide</h5>
                            <p className='office__info'>Buy a home</p>
                            <p className='office__info'>Rent a home</p>
                            <p className='office__info'>Add your own home</p>
                        </div>
                    </Col>
                    
                    <Col lg='2' md='4' sm='6'>
                        <div className='mb-4' >
                            <h5 className="footer__link-title">Contact Us</h5>
                            <p className='office__info'>Homes.com</p>
                            <p className='office__info'>Phone: +91 9978653456</p>
                            <p className='office__info'>e-mail: homes.com@gmail.com</p>
                        </div>
                    </Col>
                    
                    <Col lg='12'>
                        <div className='footer__bottom'>
                            <p className='section__description d-flex align-items-center justify-content-center gap-1 padding-top-4'>
                                <i class='ri-copyyright-line'></i>
                                Copyright @ HOMES.COM All rights reserved.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>



        </footer>
    )
}

export default Footer
