import React, { Fragment } from 'react';
import './index.scss';

// const useStyles = makeStyles((theme: any) => ({
//    root: {
//       flexGrow: 1,
//       height: 'calc(100vh - 60px)',
//       background: theme.colorPalette.primary.light,
//    },
//    section: {
//       height: '100%',
//    },
// }));

const DESC_WHO_WE_ARE = 'blogify is a web platform that you can share stories and posts with people.';

const DESC_WHAT_WE_DO = 'i created blogify with react, apollo, and material-ui. need help? get in touch.';

const MOCKS_MENU = [
   {
      title: 'what is blogify?',
      description: DESC_WHO_WE_ARE,
   },
   {
      title: 'what does it do?',
      description: DESC_WHAT_WE_DO,
   },
];

const Contact = () => {
   return (
      <Fragment>
         <main className='contact-container'>
            <div className='contact-bottom-section'>
               {MOCKS_MENU.map((item, index) => (
                  <Fragment key={item.title + index}>
                     <div className='contact-title'>
                        <p>{item.title}</p>
                     </div>
                     <div className='contact-section'>
                        <span>{item.description}</span>
                     </div>
                  </Fragment>
               ))}
            </div>
         </main>
      </Fragment>
   );
};

export default Contact;
