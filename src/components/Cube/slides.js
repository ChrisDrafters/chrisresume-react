import definitions from '../../images/definitions-chart.png'
import definitions2 from '../../images/definitions-chart2.png'
import runtime from '../../images/runtime-chart.png'
import migration from '../../images/migration-chart.png'
import monitor from '../../images/monitor.jpg'
import sudoku from '../../images/sudoku.png'
import sonic from '../../images/sonic.png'
import youtube from '../../images/youtube.png'
import draft from '../../images/draft.png'
import draft2 from '../../images/draft2.jpg'
import csgo from '../../images/csgo.png'
import csgo2 from '../../images/csgo2.png'
import slide1Pro from '../../images/slide1-pro.png'
import slide2Pro from '../../images/slide2-pro.png'
import slide3Pro from '../../images/slide3-pro.png'
import slide4Pro from '../../images/slide4-pro.png'
import slide1Pers from '../../images/slide1-pers.png'
import slide2Pers from '../../images/slide2-pers.png'
import slide3Pers from '../../images/slide3-pers.png'
import slide4Pers from '../../images/slide4-pers.png'
import slide5Pers from '../../images/slide5-pers.png'
import slide6Pers from '../../images/slide6-pers.png'

const slides =
{
    professional: [
        {
            id: 0,
            title: "Mobile Definitions System for Performance Improvements",
            description: "A complete reimagining of the data flow for our mobile applications to offload downloading and user waiting to less urgent times, improve speed, and lower mobile data consumption by 93%.",
            sliderImg: slide1Pro,
            problem: "Loading and switching between drafts, a time-sensitive operation, was bogged down by large data transfer across the network and slow JSON parsing.",
            body: "In the summer of 2020 a new, well-funded direct competitor entered the marketplace with simultaneous web and mobile app releases. It became clear early on that their marketing focus was on having the best drafting experience available. This meant that my focus had to be on improving our drafting experience. This particular project was focused on vast improvements to the mobile draft structure, but ties directly into the second project on this page where we rebuilt the web drafting experience as well. For the mobile draft the main bottleneck appeared to be the intial load and switching to any other active drafts. This meant hitting an endpoint for all data related to the draft you're trying to view, including hundreds of players, stats to occupy the players table, and a full list of picks in the draft. Obviously we could benefit immensely by slimming down the data initially sent and switching to the binary endpoints described in the second project on this page, but I still needed to come up with a way to improve initial load times further. I settled on utilizing local storage in the form of an SQLite database. See the comparison structures from before and after below.",
            body2: "I decided on building an endpoint with three main components: a database structure, teams table, and players table. The mobile apps would store and send version variables for both the database structure and teams table (as these do not change very frequently). For the players table, the apps would store and send a timestamp of the last time they updated these local definitions. The endpoint would query for changes to the players database since the timestamp sent and only provide those records that needed to be updated for that particular user. This meant that any wait time for a user would be offloaded to non-critical times (as opposed to when they're on the clock trying to enter a draft, like the old system). It also meant that players data for a draft was pulled from an SQLite database on the user's device, rather than being sent across the network. The endpoint would package up an SQL file and deliver it to the apps based on the version and timestamps provided to it. If the structure was out of date, the SQL file would begin by dumping existing tables and then creating new ones. If the teams version was out of date, it would provide inserts/replaces for the teams data. Lastly, if there were any new updates or inserts for the players table based on the timestamp sent from the app, the SQL file would include those as well. Average load time for navigating to a draft or changing between drafts was improved from 4.5 seconds, down to 1.5 seconds on average after implementing the SQLite definitions system and binary endpoints.",
            img1: definitions,
            img2: definitions2
        },
        {
            id: 1,
            title: "New Desktop Draft and Binary Endpoints System",
            description: "A brand new desktop draft experience from the ground up, combined with a shift in data delivery strategy to improve load times, draft performance, and remain competitive amongst fresh competition.",
            sliderImg: slide2Pro,
            problem: "Delivering data in large JSON returns, while being dev-friendly, severely slowed initial load times due to parsing and data size. Additionally, the design and functionality of our existing draft was becoming dated and felt sluggish.",
            body: "With the launch of new competition came well-deserved comparisons and criticisms of our drafting system. What felt fresh and speedy just a year and a half earlier had suddenly fallen behind pace. Endpoints designed to improve the speed of development and make the lives of our developers easier had actually hurt the end product. Utilizing my experience with lower level languages and optimization techniques, I developed a strategy to deliver key data asynchronously and 93% smaller overall. This utilized a binary format and casting into the desired types once received on the frontend. It can be difficult for modern framework developers to quickly grasp these types of delivery methods versus the usual JSON or XML responses they're used to, but the additional time spent teaching our team how the system would work was well worth it for the performance improvements to the end-user.",
            body2: "Beyond just providing backend changes to improve data delivery, I also spearheaded the creation of brand new frontend Angular draft components. The entire draft was rebuilt from the ground up with these new data delivery systems, speed, and modern functionality in mind. Our competition was marketing purely on having the best draft experience available, and we aimed to challenge that claim very clearly. We wanted to load faster, switch between drafts faster, and be more feature rich. With clear goals laid out and a better underlying backend system, I believe we were able to accomplish what we set out to do.",
            img1: draft,
            img2: draft2
        },
        {
            id: 2,
            title: "Runtime Scoring at Scale",
            description: "Simultaneous stats, scoring, and rankings calculations for millions of records on sub-30-second update cycles.",
            sliderImg: slide3Pro,
            problem: "Slow separated systems for scoring led to 3 to 5 minute wait times for scoring updates during live contests, and updates would hit different contests at different times.",
            body: "As our userbase and contest sizing increased, our legacy scoring systems began to fail us. We had crons hitting our 3rd-party providers for stats regularly during live games, other crons updating player stats within contests, and a final set of crons going through and updating team scores and rankings within contests. This worked fine as a proof-of-concept early on, but no thought had ever been given to scale and performance when calculating scores. Scores would take upwards of 5 minutes to reflect a major event that affected many lineups, like a touchdown in the big game. Even worse, scores would update randomly across contests instead of reflecting that touchdown for everybody at the same time. My process for changing this began with scale: we needed a way to add more compute power on demand without disrupting scoring on an NFL Sunday. For this, I decided on custom Node clusters that could be added and taken away without any disruption of service. I also wanted to make sure all major scoring events would hit every team at the same time, and for this I employed a double-caching technique. We could update records in our local cache on the server, but those records wouldn't propagate to the delivery cache until all were updated. You can see the diagram below:",
            body2: "Next was speed. We needed a way to keep update cycles around 30 seconds or less. This allowed us to stay within our API quotas with our data providers and reflect scoring changes as frequently as possible. For this, we needed as much information cached as possible. We simply couldn't be hitting external data sources (databases, outside servers, etc.) for anything. We commissioned instances with a focus on available RAM and I/O throughput, preloading all of the contest and team data on cluster launch, to avoid any need for data fetching or communication with any outside source. We also added a final layer of interconnected caching among the clusters, so that additional clusters didn't mean additional hits to our 3rd-party API partners for stats. If an event was queried within the last 30 seconds, you would get a cached copy from the local server rather than sending a request to the API. This change greatly improved our ability to stay within our quotas with providers. Once all of these changes were employed, we had a system capable of 30-second update cycles for millions of records simultaneously.",
            img1: runtime,
            img2: null
        },
        {
            id: 3,
            title: "Migration From Legacy PHP/MVC Framework to Express/Angular",
            description: "Moving from a legacy system that existed before I joined the team for both API and frontend to more modern technologies for both.",
            sliderImg: slide4Pro,
            problem: "Dated technologies made hiring motivated developers more difficult (people want to work with the latest and greatest), and created unnecessary bottlenecks for both frontend and API.",
            body: "When I first joined the team, I was surprised to find that they had built the entire platform in a PHP MVC framework called CodeIgnitor and the frontend was all plain HTML/CSS/JS. This was in a time before React and Angular were dominating the industry, but even for those times it was still quite odd to choose these types of frameworks for developing a project at scale. As draft performance suffered and hiring developers that wanted to work with our codebase became more difficult, I had to make the obvious choice of migrating to a more modern stack. You can see the details of the transition in the diagrams below.",
            body2: "When the decision to switch to Angular for frontend was made, there wasn't a clear standout for frameworks in the industry quite yet. If I were to go back in time, I likely would have instead chosen React simply because of the overabundance of React developers on the market and the huge community support surrounding it. That being said, I tend to prefer the more structured approach taken in Angular applications, Angular templating over JSX, and automated redraws versus effects and state management in React. From a purely developer friendly and iteration speed standpoint, Angular will always win in my book. However, those niceties come with the price of much larger delivered packages and slight performance hits.",
            img1: migration,
            img2: null
        }
    ],
    personal: [
        {
            id: 0,
            title: "Raspberry Pi Baby Cam with Accompanying App",
            description: "Instead of buying a camera system, I utilized parts around the house to make our own.",
            sliderImg: slide1Pers,
            problem: "With our little one on the way, we needed a camera system set up to monitor her from anywhere.",
            body: "When I started researching some of the systems with features that we were interested in, I couldn't believe the prices for some of them. I quickly realized that I could repurpose an old USB webcam and Raspberry Pi that I already owned to achieve the same things. I ended up using open source security camera software, P2P music broadcasting software with the built-in microphone on the webcam, and a Node webserver also running on the Pi to package everything together for use.",
            body2: "For the user experience, I put together a mobile app using NativeScript. This allowed me to compile for our different device types without different codebases and utilize built-in components for a majority of the features. The final feature set (available from anywhere, not just our home network) included: a video feed of our little girl's room, two-way audio (using a small USB speaker connected to the Pi) so we could hear her and talk to her, a predefined audio list to play for her at bed time (could be updated from the server), and a failed breathing monitor utilizing a tiny accelerometer in her crib. Unfortunately, the accelerometer didn't have the fidelity to detect changes in breathing above the regular noise of the device. We ended up supplementing this part with a 3rd-party product.",
            img1: monitor,
            img2: null
        },
        {
            id: 1,
            title: "ML-Assisted Sudoku Solver",
            description: "Using AI (not in the way you would expect), this web tool accepts a screenshot from our favorite Sudoku app and returns a completed board.",
            sliderImg: slide2Pers,
            problem: "Sudoku solving is a pretty straight-forward task, but was slightly complicated by artifacting in the screenshots from the mobile app we play on.",
            body: "For a few weeks, my wife and I would play through a couple of sudoku on an app before we went to bed. I thought it would be funny to build a little web utility to import a screenshot of a board we were working through and have it output the solved puzzle, without telling her how I was ripping through these puzzles so quickly. I suspected this would only take twenty to thirty minutes, but was met with an unexpected issue. From screenshot to screenshot, the small amounts of compression automatically added to the images would make it difficult to detect which numbers were in the squares. This is where a very light-weight machine-learning wrapper was implemented, ml5.js.",
            body2: "ml5.js is an extremely user-friendly wrapper for TensorFlowJS and very quickly allowed me to train a classification model for detecting the numbers regardless of any compression noise. It may seem like overkill to employ ML for such a simple computer-vision problem, but thanks to the simplicity of ml5.js it really only took a few minutes to have a working, lightweight model. Once I could reliably detect the board values, it was just a regular sudoku solving problem. The output was drawn over top of the original board using HTML5 canvas. My wife was not amused.",
            img1: sudoku,
            img2: null
        },
        {
            id: 2,
            title: "NEAT AI for Sonic Mini-Game",
            description: "Neuro-Evolution of Augmenting Topologies (NEAT) is utilized to create an AI across many generations to effectively navigate a mini-game from Sonic the Hedgehog (recreated here from scratch in HTML5 canvas and JS).",
            sliderImg: slide3Pers,
            problem: "How to train AI to evolve and become better at solving a mini-game.",
            body: "This project came about because of my love for this obscure mini-game from the Sonic the Hedgehog series and having an interest in the NEAT model. NEAT describes a model where an AI improves across generations without having any real idea about the goal it is trying to accomplish. The NEAT model is fascinating in that you simply set up some weights and a fitness model to determine how well a generation is performing, and over time the AI mutates and breeds to become competetent at achieving the goal.",
            body2: "In addition to the NEAT model implemented from scratch, this project also required recreating the mini-game itself in JS and HTML5 canvas. A simple level creator was also needed, including a custom file format. In the end, it was very fun watching the clueless AI spin in circles in the early generations to becoming expert players in the later stages of evolution.",
            img1: sonic,
            img2: null
        },
        {
            id: 3,
            title: "YouTube Video Generator",
            description: "Scrape Reddit for highlight clips from popular game subreddits, use 3rd-party tools to download and splice together, and lastly package together with intro/outro and thumbnail.",
            sliderImg: slide4Pers,
            problem: "How to automate highlight compilation videos from popular video games, for release on YouTube.",
            body: "I decided to create this project after seeing the rise in popularity of channels showcasing highlights for popular games and recognizing the clips from the top posts in popular subreddits. I suspected that these videos were being automatically generated, and set out to put together the tools to do the same. The first step was scraping from these subreddits based on post tags and links to Twitch clips, over a set period of time. Once I had a list of clips I utilized a 3rd-party tool to download each video. After all of the clips are downloaded, they are spliced together automatically using FFMPEG. Lastly, an output video is generated.",
            body2: "The final piece of the puzzle, aside from publishing to YouTube, was being able to quickly generate a thumbnail. I wanted every part of the process to be extremely simple with no need for outside tools. For this, I created an HTML page with a video element containing the output file. You could scrub through the video and pause where you liked to grab a thumbnail. In a canvas below the video element, it would superimpose an icon in the top corner of the thumbnail for branding purposes and output a thumbnail of the proper size for YouTube.",
            img1: youtube,
            img2: null
        },
        {
            id: 4,
            title: "External Read-Only Game Hacks",
            description: "An experiment in hypothetical cheating methods in both the streaming world and at the highest levels of competitive gaming.",
            sliderImg: slide5Pers,
            problem: "How could personalized hardware, drivers, and external devices be used to cheat at popular video games?",
            body: "Using a popular first-person shooter named Counter-Strike: Global Offensive, I started testing my theory that cheating could be happening in some very clever ways at the highest levels of competitive gaming. I began with a proof-of-concept showing that players could gain huge advantages from using read-only techniques without hooking the game engine. Once my local application was complete (the image below), I started working on an implementation for a mobile phone that could be used by streamers (who are regularly showing all of their screens to viewers, making it harder to cheat the traditional ways) to gain additional information about opponents externally. This can be seen in the bottom image below.",
            body2: "I've been unable to find the time for the planned conclusion to this experiment: a low-level driver for either a gaming mouse or headset that would access application memory and make the read-only operations necessary for gaining an edge. I had envisioned a rumble motor built into either a mouse or, more likely, a headset that would vibrate slightly when a user is aimed at an opponent even through walls. This tiny, almost unnoticeable edge would be enough to turn the tides at the highest levels of competitive play. Some day I hope to build out this final proof-of-concept, fully document my concerns, and explain how to possibly mitigate them in e-sports.",
            img1: csgo,
            img2: csgo2
        },
        {
            id: 5,
            title: "This Website",
            description: "Utilizing interchangeable Angular and React builds of the same site, Redux for state management, and global dark-mode.",
            sliderImg: slide6Pers,
            problem: "How do you demonstrate your development abilities directly in your portfolio, aside from showing past work?",
            body: "I knew very early on that I wanted a universal Angular <> React switch on this website. I think demonstrating the ability to build the same exact project in multiple frameworks is important, as there are a lot of \"one-trick ponies\" on the market these days. Unfortunately, websites like this don't do a great job of demonstrating any backend work or structural design abilities. For that you just have to rely on the projects that you choose to showcase, instead.",
            body2: "You'll find a lot of random ideas scattered throughout the pages of this website. From a 3D cube slider that I've wanted to build, to a lamp cord for toggling between light and dark modes. Random CSS3 animations on an image of myself, strange sound effects, and a sticker of my favorite sports team. Certainly design isn't my strongest area, but I did want to demonstrate a number of different techniques and ideas for components within this portfolio. I'll likely be adding more over time as an idea pops into my head. You can keep track of the code for this site at the GitHub repositories: ChrisResume-React and ChrisResume-Angular.",
            img1: null,
            img2: null
        }
    ]
};

export default slides;