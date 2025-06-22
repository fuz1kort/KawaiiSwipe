import "./profile.css";

export const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-image-wrapper">
        <img
          src="/images/profilePage/profilePhoto.png"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-actions">
          <div className="icon-button orange">
            <img src="/images/profilePage/profileActionStroke.svg" alt="stroke" />
          </div>
          <div className="icon-button pink large">
            <img src="/images/profilePage/profileActionLike.svg" alt="stroke" />
          </div>
          <div className="icon-button purple">
            <img src="/images/profilePage/profileActionStar.svg" alt="stroke" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title-wrapper">
          <div className="card-title">Jessica Parker, 23</div>
          <div className="card-subtitle">Professional model</div>
        </div>
        
        <div className="location">
          <div className="">
            <h2 className="section-title">Location</h2>
            <span>Chicago, IL, United States</span>
          </div>
          
          <div className="distance">
            <img src="/images/profilePage/profileIconLocation.svg" alt="location" />
            <span>1 km</span>
          </div>
        </div>

        <div className="description">
          <h2 className="section-title">About</h2>
          My name is Jessica Parker and I enjoy meeting new people and finding
          ways to help them have an uplifting experience. I enjoy reading...
          <div className="read-more">Read more</div>
        </div>

        <div className="section">
          <h2 className="section-title">Interests</h2>
          <div className="tags">
            {['Travelling', 'Books', 'Music', 'Dancing', 'Modeling'].map((interest) => (
              <span
                key={interest}
                className={`tag ${
                  ['Travelling', 'Books'].includes(interest) ? 'tag-active' : ''
                }`}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Gallery</h2>
            <span className="see-all">See all</span>
          </div>
          <div className="gallery">
            {[1, 2, 3, 4, 5].map((idx) => (
              <img
                key={idx}
                src={`/images/profilePage/gallery/photo-${idx}.png`}
                alt={`Gallery ${idx}`}
                className="gallery-image"
              />
            ))}
          </div>
        </div>
      </div>      
    </div>
  );
}
