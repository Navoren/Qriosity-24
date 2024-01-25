import '../Styles/Home.css';
import LandingNavbar from '../common/components/LandingNavbar';

function Rules() {
  return (
    <div className="rules bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")'}}>
      <LandingNavbar />
      <div className='rulesInfo bg-gray-100 rounded-md m-10 p-4 flex flex-col'>
        <h1 className='text-3xl underline font-bold m-4 mx-auto'> Rules </h1>
        <ul className='rulesData leading-9 tracking-wide text-2xl list-decimal m-12'>
            <li>Register yourself on the QRIOSITY 4.0 website to access the questions using JUIT Solan Email ID only.</li>
            <li>Each question is a list of hints directing to a certain term or company or software, everything is related to the technical world. Internet is your comrade, go crazy.</li>
            <li>6 hours will be allotted (starting at 4 PM, 04/02/2023) to complete the whole quiz.</li>
            <li>Answers are <b>NOT</b> case sensitive.</li>
            <li>Write your answer in the given box. If the answer is correct, you'll be allowed to move to the next question. If not correct, keep trying, infinite tries are there.</li>
            <li>If answer contain multiple words remove white space. For example, if the answer is “United Airlines”, it is to be submitted as “unitedairlines” only.</li>
            <li>The answer can contain numerals too. For example, if the answer is “4chan”, it is to be submitted as “4chan” only.</li>
            <li>Ranks can be viewed on the real time leaderboard. The leader board is updated every time a submission is made.</li>
            <li>Remember, once the timer starts, it can't be paused. It is a race against time. </li>
            <li>In order to see yourself on the leaderboard, you will have to register yourself for Qriosity 4.0 using the link given below, or else your participation won't be considered</li>
            <li>If any kind of cheating is found, you'll be disqualified and decision of the organizers will be final.</li>
        </ul>

        <h1 className='text-3xl font-bold m-4 mx-auto'> Happy Hunting!! </h1>
      </div>
    </div>
  );
}

export default Rules;