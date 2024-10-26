import React from 'react';
import '../CSS/Profile.css';

const Profile = () => {
  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-between">
      {/* Profile Section on the Left */}
      <div className="card profile-card p-4">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img
              src="https://i.imgur.com/wvxPV9S.png" // Male profile image
              height="100"
              width="100"
              alt="Profile"
            />
          </button>
          <span className="name mt-3">Name</span>
          <span className="idd">@username</span>
          <span className="country mt-1">India</span>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span className="idd1">Oxc4c16a645_b21a</span>
            <span>
              <i className="fa fa-copy"></i>
            </span>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">1069 <span className="follow">Followers</span></span>
          </div>
          <div className="d-flex mt-2">
            <button className="btn1 btn-dark">Edit Profile</button>
          </div>
          <div className="text mt-3">
            <span>
              Food lover and passionate chef specializing in Italian and Thai cuisine.<br /><br />
              Sharing recipes and culinary adventures from my kitchen to yours!
            </span>
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span><i className="fa fa-twitter"></i></span>
            <span><i className="fa fa-facebook-f"></i></span>
            <span><i className="fa fa-instagram"></i></span>
            <span><i className="fa fa-pinterest"></i></span>
          </div>
          <div className="px-2 rounded mt-4 date">
            <span className="join">Joined May, 2021</span>
          </div>
        </div>
      </div>

      {/* Center Section: Favorite Dishes and Cooking Skills */}
      <div className="center-section d-flex flex-column align-items-center">
        <div className="card extra-content p-4">
          <h4 className="content-title">Favorite Dishes</h4>
          <ul className="favorite-dishes">
            <li>Spaghetti Carbonara</li>
            <li>Pad Thai</li>
            <li>Tiramisu</li>
            <li>Green Curry</li>
            <li>Margherita Pizza</li>
          </ul>
        </div>
        
        <div className="card skills-section p-4 mt-4">
          <h4 className="content-title">Cooking Skills</h4>
          <ul className="skills-list">
            <li>Italian Cuisine</li>
            <li>Thai Cuisine</li>
            <li>Baking & Pastry</li>
            <li>Grilling</li>
            <li>Food Plating & Presentation</li>
          </ul>
        </div>
      </div>

      {/* Right Section: Latest Recipes and Upcoming Events */}
      <div className="right-section d-flex flex-column align-items-start">
        <div className="card latest-recipes p-4">
          <h4 className="content-title">Latest Recipes</h4>
          <div className="recipe">
            <h5>Pasta Primavera</h5>
            <p>A delicious blend of seasonal vegetables and pasta tossed in a light olive oil sauce.</p>
          </div>
          <div className="recipe">
            <h5>Thai Green Curry</h5>
            <p>A fragrant and spicy curry made with fresh herbs and coconut milk.</p>
          </div>
        </div>

        <div className="card events-section p-4 mt-4">
          <h4 className="content-title">Upcoming Events</h4>
          <ul className="events-list">
            <li>Cooking Workshop - June 15, 2024</li>
            <li>Food Festival - July 20, 2024</li>
            <li>Online Cooking Class - August 5, 2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
