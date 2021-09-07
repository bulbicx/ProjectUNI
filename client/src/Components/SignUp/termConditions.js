import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    main_container: {
        margin: '1em',
        padding: '2em',
        background: '#F2F4F4'
    }
})

export default function TermConditions(props) {
    const classes = useStyles()

    return (
        <div className={classes.main_container}>
            <h1><b>TERMS OF USE</b></h1><br/><br/>

            <h3><b>AGREEMENT TO TERMS</b></h3>
            
            <p>these terms of use advice to use responsibly the use of the web application. the site is realized for the project of final year and therefore it is non existent. Any use of the application will help the owner and creator of the web application to make improvements on the web application. It offers the user to search properties and look at the information if interested, then they can fake to be intersted in a property and act as some other estate web application for buying or renting a property. Some features requires the registration as user and therefore the information you provide us it is your choice as again this web application is fake and it does not really refer to a real business.</p><br/>

            
            <h3><b>LIMITATIONS OF LIABILITY</b></h3>

            <p>IN NO EVENT WILL WE OR OUR DIRECTOR, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARASING FROM YOUR USE OF THE SITE OR THE MARKETPLACE OFFERINGS, EVEN IF WE HAVE BEEN ADVICED OF THE POSSIBILITY OF SUCH DAMAGES, NOT WITHSTANDING ANYTHYNG TO THE CONTRARY CONTAINED HEREIN OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY BY YOU TO US.</p><br/>
            
            <h3><b>USER DATA</b></h3>

            <p>We will maintain certain data that you transmit to the site for the solely purpose of testing, improving this application. As it is not a real application you are solely responsible for all data that you transmit or that relates to any activity you have undertaken. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p><br/>
        </div>
    )
}
