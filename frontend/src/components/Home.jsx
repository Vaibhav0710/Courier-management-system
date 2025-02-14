import React from 'react';
import './Home.css';
import Footeer from './Footeer';

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-12 flex flex-col items-center justify-center">
            <div className="jumbotron">
            </div>

            <div className="homepage-content">
                <div className="flex flex-col md:flex-row items-center justify-center w-full">
                    <div className="homepage-container">
                        <div className="content-box">
                            <div className="text-center animate__bounceInDown">
                                <h1 className="title flashy-title">
                                    Courier Express
                                </h1>
                            </div>
                            <p className="description">
                                <strong>Courier Express</strong> is a state-of-the-art <strong>Courier Service Management System </strong>
                                designed to simplify and optimize delivery operations for businesses and individuals.
                                Whether you're handling local deliveries or managing nationwide logistics,
                                our platform ensures <strong>fast, secure, and reliable</strong> order fulfillment.
                            </p>

                            <ul className="feature-list">
                                <li><span className="check-icon"></span> <strong>Seamless Order Processing</strong> – Easily place, track, and manage deliveries.</li>
                                <li><span className="check-icon"></span> <strong>Real-Time Tracking</strong> – Stay updated with live delivery status.</li>
                                <li><span className="check-icon"></span> <strong>Smart Route Optimization</strong> – Reduce time and costs with AI-powered routing.</li>
                                <li><span className="check-icon"></span> <strong>Multi-User Access</strong> – Role-based access for admins, delivery partners, and customers.</li>
                                <li><span className="check-icon"></span> <strong>Secure Payments</strong> – Hassle-free transactions with legacy payment option.</li>
                            </ul>
                            <div className="button-container">
                                <a href="/home">
                                    <button className="btn btn-primary">
                                        Get Started
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footeer/>
        </div>
    );
}

export default Home;
