import './Home.scss'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

const Home = () => {
    const isDark = useSelector(state => state.dark)

    return (
        <div className={classNames('Home', (isDark) ? 'dark' : '')}>
            <div className="about">
                <div className="imageContainer">
                    <div className="image1"></div>
                    <div className="image2"></div>
                </div>
                <div className="rightB">
                    <div className="titleContainer">
                        <div className={classNames('title', (isDark) ? 'dark' : '')}>About Me</div>
                    </div>
                    <div className="body">
                        <p>Hi, I'm Chris Manning. Thanks for checking out my portfolio!</p>
                        <p>I'm a 28-year-old full stack developer and engineering manager living in upstate New York with my wife and 1-year-old daughter. I'm currently the Chief Technology Officer for Drafters Fantasy Sports.</p>
                        <div><div className="wings"></div>In my free time I enjoy spending time with my family, getting outside to shoot hoops, and catching a hockey game (Go Wings!).</div>
                        <p>I began my software development journey at the age of 11, hacking some of my favorite video games. I joined online communities and soaked in every bit of programming knowledge I could get my hands on. Eventually, I was making software releases to these communities that garnered hundreds of thousands of downloads. I was writing large scale software with very little experience, and learning by doing. Learning by doing has always been a central theme in my software development life.</p>
                        <p>As I got older, I began to move into web development and freelance projects to continue learning and expand my skill set. I started an advertising software business in my college years and quickly learned about production code and the business world.</p>
                        <p>In recent years as CTO for Drafters Fantasy Sports, I've developed management skills and found a passion for the balance of team-building, business growth, and product development. I never saw myself as more than a developer, but these past few years of learning by doing have shown me that I am capable of building a quality team and driving a product towards a bright future. I welcome you to check out both my professional and personal projects on this website and reach out with any questions or opportunities you'd like to discuss!</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home
