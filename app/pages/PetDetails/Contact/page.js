import React from 'react'

function page() {
    return (
        <div className='contactpage'>
            <div className='contactpage-container'>
                <div className='contactpage-contents'>
                    <div className='contactpage-head'>
                        <h2>Contact Details</h2>
                    </div>
                    <div className='contactpage-contents'>
                        <div className='contactpage-content'>
                            <div className="contactpage-form">
                                <div className='contactpage-form-inputs'>
                                    <div className="form1">
                                        <label>Full Name</label>
                                        <input
                                            className="contactpage-content-input"
                                            name="heading"
                                            type="text"
                                            placeholder="John Rebecca"
                                        />
                                    </div>
                                </div>
                                <div className='contactpage-form-inputs'>
                                    <div className="form1">
                                        <label>Shop Name</label>
                                        <input
                                            className="contactpage-content-input"
                                            name="heading"
                                            type="text"
                                            placeholder="John Rebecca"
                                        />
                                    </div>
                                </div>
                                <div className='contactpage-form-inputs'>
                                    <div className="form1">
                                        <label>Phone Number</label>
                                        <input
                                            className="contactpage-content-input"
                                            name="heading"
                                            type="text"
                                            placeholder="12345 67890"
                                        />
                                    </div>
                                </div>
                                <div className='contactpage-form-inputs'>
                                    <div className="form1">
                                        <label>Email</label>
                                        <input
                                            className="contactpage-content-input"
                                            name="heading"
                                            type="text"
                                            placeholder="Johnrebecca@mail.com"
                                        />
                                    </div>
                                </div>
                                <div className='contactpage-form-inputs'>
                                    <div className="form1">
                                        <label>Address</label>
                                        <textarea
                                            className="contactpage-content-input"
                                            name="heading"
                                            rows={5}
                                            type="text"
                                            placeholder="123, 1st Cross St, Tenkasi, Tamil Nadu 123 456."
                                        />
                                    </div>
                                </div>
                                <div className='contactpage-form-inputs'>
                                    <div className="form1">
                                        <label>Message</label>
                                        <textarea
                                            className="contactpage-content-input"
                                            name="heading"
                                            rows={5}
                                            type="text"
                                            placeholder="Type Message"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
