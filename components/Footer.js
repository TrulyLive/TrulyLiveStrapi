import Button from './Button'

function Footer({ footerData }) {
  // console.log('Footer Data : ', footerData)

  return (
    <>
      <footer>
        <div className="bg-scBlack5 border-t border-solid border-scBlack7 pt-20	pb-20 text-xm ">
          {/* TOP FOOTER */}
          <div className="flex flex-col md:flex-row justify-around w-11/12 max-w-6xl mx-auto">
            <div className="flex flex-col space-y-3 text-scGray6 w-fit md:w-1/4 px-3.5">
              <h3 className="text-pureWhite text-base tracking-wide my-5 uppercase">about</h3>
              <p className="leading-8 font-light pr-5 ">{footerData.about_description}</p>
            </div>

            <div className="flex flex-col space-y-3 text-scGray6 w-fit md:w-1/4 px-3.5">
              <h3 className="text-pureWhite text-base tracking-wide my-5 uppercase">our services</h3>
              {footerData.ourServicesLink.map((value, index) => {
                return (
                  <a
                    href={value.links}
                    className="capitalize hover:text-pmRed1 transition duration-300 font-light"
                    key={index}
                  >
                    {value.ourServicesLink}
                  </a>
                )
              })}
            </div>

            <div className="flex flex-col space-y-3 text-scGray6 md:w-1/4 w-fit px-3.5">
              <h3 className="text-pureWhite text-base tracking-wide my-5 uppercase">Quick links</h3>
              {footerData.QuickLinks.map((value, index) => {
                return (
                  <a
                    href={value.links}
                    className="capitalize hover:text-pmRed1 transition duration-300 font-light"
                    key={index}
                  >
                    {value.QuickLinks}
                  </a>
                )
              })}
            </div>

            <form className="flex flex-col space-y-3 text-scGray6 w-1/4 px-3.5">
              <h3 className="text-pureWhite text-base tracking-wide my-5 uppercase">subscribe now</h3>
              <label htmlFor="email" className="">
                <input type="email" required={true} placeholder="Email Address" id="email" className="py-2 px-4 w-96" />
              </label>
              <div>
                <Button text="Subscribe" link="submit" />
              </div>
            </form>
          </div>
        </div>
        {/* BOTTOM FOOTER */}
        <div className="bg-scBlack2 text-scGray3 text-xs text-center py-8 border-solid border-t border-scBlack7">
          <h5 className="mb-1 tracking-widest font-normal">
            COPYRIGHT {new Date().getFullYear()}. ALL RIGHTS RESERVED.
          </h5>
          <h6 className="tracking-wider leading-4 font-normal">Design And Developed By Truly Live.</h6>
        </div>
      </footer>
    </>
  )
}

export default Footer
