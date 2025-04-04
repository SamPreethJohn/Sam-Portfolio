const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const header = document.querySelector('header');
const barsBox = document.querySelector('.bars-box');

//Toggle mobile nav
menuIcon.addEventListener('click',() => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
})

//Page transition effect
const activePage = () => {
  if (header) {
    header.classList.remove('active');
    setTimeout(() => header.classList.add('active'), 1100);
  }

  navLinks.forEach(link => link.classList.remove('active'));

  if (barsBox) {
    barsBox.classList.remove('active');
    setTimeout(() => barsBox.classList.add('active'), 1100);
  }

  sections.forEach(section => section.classList.remove('active'));

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

//Navigation click events
navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();
            link.classList.add('active');
            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

//logo click event
logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
})
//Resume tab logic
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => { 

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

//Portfolio carousel logic
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const portfolioDetails = document.querySelectorAll('.portfolio-detail ');

let index = 0;
const maxIndex = portfolioDetails.length - 1;

const activePortfolio = () => {
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

arrowRight?.addEventListener('click', () => {
    if (index < maxIndex) {
        index++;
        arrowLeft.classList.remove('disabled');
    }
    if (index === maxIndex) {
        arrowRight.classList.add('disabled');
    }

    activePortfolio();
});

arrowLeft?.addEventListener('click', () => {
    if (index > 0) {
        index--;
        arrowRight.classList.remove('disabled');
    }
    if (index === 0) {
        arrowLeft.classList.add('disabled');
    }

    activePortfolio();
});

//Contact form submission

const contactform = document.querySelector('.contact-box form');
const formmessage = document.querySelector('#form-message');

if (contactform) {
    contactform.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactform);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formspree.io/f/mqabnejy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                formmessage.textContent = 'Message sent successfully!';
                formmessage.style.color = 'green';
                contactform.reset();
            } else {
                formmessage.textContent = 'Failed to send message. Please try again.';
                formmessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error sending message:', error);
            formmessage.textContent = 'Network error. Please try again later.';
            formmessage.style.color = 'orange';
        }
    });
}