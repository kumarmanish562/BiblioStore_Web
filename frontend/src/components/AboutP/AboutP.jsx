import React from 'react'
import aboutStyles from '../../assets/dummystyles'

const AboutP = () => {
  return (
    <div className={aboutStyles.container} >
      <section className={aboutStyles.section}>
        <div className={aboutStyles.innerContainer}>
          <div className={aboutStyles.headingWrapper}>
            <div className=' relative inline-block'>
              <h1 className={aboutStyles.heading}>
                Crafting Literary <br />
                Futures    </h1>
            </div>

          </div>
        </div>

      </section>
    </div>
  )
}

export default AboutP