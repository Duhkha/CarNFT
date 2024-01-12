type Props = {}

const About = (props: Props) => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">About Turbo Trade</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" 
              data-bs-toggle="collapse" data-bs-target="#collapseOne" 
              aria-expanded="true" aria-controls="collapseOne">
              Our Story
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" 
          aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Founded in 1999, <strong>Turbo Trade</strong> began its journey in Cazin, expanding in 2008 with a branch in Sarajevo. Over the years, thousands of customers have trusted us with their car purchases, reflecting our commitment to quality and service. In 2016, we moved to a new, modern showroom in Džemala Bijedića to better serve our clients. Our growth continued internationally with the establishment of a branch in Slovenia in 2018.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" 
              data-bs-toggle="collapse" data-bs-target="#collapseTwo" 
              aria-expanded="false" aria-controls="collapseTwo">
              Innovation at Turbo Trade
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" 
          aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Embracing new technologies has always been at the heart of Turbo Trade. And now in 2024, we are taking a significant leap forward by integrating <strong>NFT technology</strong> into our sales process. This revolutionary step not only enhances the car buying experience but also positions us at the forefront of automotive sales innovation. Today, we're proud to be a leader in the auto industry, continually adopting new technologies to provide the best service to our customers.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
