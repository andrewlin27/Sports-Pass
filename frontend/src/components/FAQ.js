import React from 'react'
import './css/FAQ.css'

const FAQ = () => {
    const faqs = [
        {
            question: "How does this website work?",
            answer: "This website serves as a middle-man to get buyers and sellers in contact. The seller must not resell their sports pass for a profit, according to the 12th Man Foundation. After the ticket is pulled, the buyer must return the sports pass back to the seller. "
        },
        {
            question: "How do I contact the website admins?",
            answer: "Email aggiepasses@gmail.com for inquiries regarding potential sponsorships or any other aspects of this website."
        },
        {
            question: "How should I ask a seller to buy their sports pass?",
            answer: "Traditionally, students have met up on campus prior to their ticket pull day to exchange the sports pass. It is the buyer's responsibility to return the sports pass to the seller after the ticket is pulled. "
        },
        {
            question: "How do I delete my listing?",
            answer: "Find your listing on the 'Delete' page, then use the password you set when creating the listing. Contact aggiepasses@gmail.com if you forgot your password."
        },
        {
            question: "Is this allowed?",
            answer: "Yes, according to the 12th Man Foundation, as long as you do not make a profit from reselling your sports pass, it is allowed. The face value of your sports pass each home game can be found in the 'Info' tab under the 'Walk-Up & Conversion' column."
        },
        {
            question: "Is this website associated with Texas A&M?",
            answer: "No, we are not associated with Texas A&M and are not school officials. We are just Aggies who want to provide an easier way for students to buy & sell their sports passes in hopes of maximizing the attendence at every home game."
        },
        {
            question: "Why is Arkansas listed diferently?",
            answer: "The Arkansas listings represent tickets, not sports passes. Therefore, they will contain the ticket's section number instead of a sports pass classification."
        }
    ]
    return (
    <div className='faq-page'>
        <h1>Frequently Asked Questions</h1>

        <div>
            {faqs.map((faq, index) => (
                <div key={index} className='faq-item'>
                    <h3 className='faq-question'>{faq.question}</h3>
                    <p className='faq-answer'>{faq.answer}</p>
                </div>
            ))}
        </div>
    </div>
    )
}

export default FAQ