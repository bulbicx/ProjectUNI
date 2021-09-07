import React from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    main_container: {
        margin: '1em',
        padding: '2em',
        background: '#F2F4F4',
        fontSize: '1.3rem'
    }
})

export default function CookiePolicy(props) {
    const classes = useStyles()

    return (
        <div className={classes.main_container}>
            <h1><b>COOKIE POLICY</b></h1><br/><br/>
            <p>
                This Cookie Policy explains how VirtualHome ("<b>Company</b> , "<b>We</b>", "<strong>us</strong>", and "<strong>our</strong>") uses cookies and similar technologies to recognize you when you visit our websites at<a href="http://virtualhome.co.uk" target="_blank" data-custom-class="link">http://virtualhome.co.uk</a> ("<strong>Websites</strong>"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <p>
                In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, us, are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.We use first party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Websites for advertising, analytics and other purposes. 
            </p>
            
                
        </div>
    )
}
