$('document').ready(function() {

  $.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=name,email,picture,location,dob,phone,login&noinfo&nat=us',
    dataType: 'json',
    success: function(data) {
      console.log(data);

    // create directory overlay --> modal background
      const overlayDiv = document.createElement('SECTION');
      document.body.appendChild(overlayDiv);
      overlayDiv.classList.add('overlay');

      for(let i = 0; i < data.results.length; i += 1) {

        const employeeDiv = document.createElement('DIV');
        let firstName = data.results[i].name.first;
        let lastName = data.results[i].name.last;
        let photo = data.results[i].picture.large;
        let email = data.results[i].email;
        let city = data.results[i].location.city;
        let street = data.results[i].location.street;
        let state = data.results[i].location.state;
        let postcode = data.results[i].location.postcode;
        let dob = data.results[i].dob;
        let phone = data.results[i].phone;
        let userName = data.results[i].login.username;
        let newDOB = new Date(Date.parse(dob));
        let usDOB = newDOB.toLocaleDateString('en-US');

      // create employee directory
        let divHTML = '<img class="smile" src="' + photo +
        '" alt="a picture of ' + firstName + '">';
        divHTML += '<div class="info">';
        divHTML += '<h2 class="name">' + firstName + " " + lastName + '</h2>';
        divHTML += '<p class="email">' + email + '</p>';
        divHTML += '<p class="city">' + city + '</p>';
        divHTML += '</div>';

        document.body.appendChild(employeeDiv);
        employeeDiv.classList.add('employeeDiv');
        employeeDiv.innerHTML = divHTML;

      // create radio inputs
        const radioInput = document.createElement('INPUT');
        document.body.appendChild(radioInput);
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', 'trigger');
        radioInput.classList.add('trigger');
        let radioID = 'trigger' + i;
        radioInput.setAttribute('id', radioID);

      // create modal windows
        let modalDiv = document.createElement('DIV');
        let modalHTML = '<span class="close">&#10006</span>';
        modalHTML += '<img class="modal-smile" src="' + photo +
        '" alt="a picture of ' + firstName + '">';
        modalHTML += '<h2 class="modal-name">' + firstName + " " +
        lastName + '</h2>';
        modalHTML += '<p class="modal-text">' + userName + '</p>';
        modalHTML += '<p class="modal-text">' + email + '</p>';
        modalHTML += '<p class="modal-text">' + city + '</p>';
        modalHTML += '<hr>';
        modalHTML += '<p class="modal-text">' + phone + '</p>';
        modalHTML += '<p class="modal-text">' + street + ', ' + state + ' '
        + postcode + '</p>';
        modalHTML += '<p class="modal-text">Birthday: ' + usDOB + '</p>';
        modalHTML += '<label class="buttons leftButton">&#9665</label>';
        modalHTML += '<label class="buttons rightButton">&#9655</label>';

        document.body.appendChild(modalDiv);
        modalDiv.classList.add('modal');
        modalDiv.innerHTML = modalHTML;

        const trigger = document.getElementsByClassName('trigger');
        const clickedImage = document.getElementsByClassName('smile');
        const clickedName = document.getElementsByClassName('name');
        const clickedEmail = document.getElementsByClassName('email');
        const clickedCity = document.getElementsByClassName('city');
        const clickedInfo = document.getElementsByClassName('info');
        const modalWindow = document.getElementsByClassName('modal');
        const modalLeft = document.getElementsByClassName('leftButton');
        const modalRight = document.getElementsByClassName('rightButton');
        const modalClose = document.getElementsByClassName('close');
        const searchInput = document.getElementById('search');

        let left = 'trigger' + [i - 1];
        let right = 'trigger' + [i + 1];

      // add for attribute to labels
        if(modalWindow[i]) {
          modalLeft[i].setAttribute('for', left);
          modalRight[i].setAttribute('for', right);
        }

      // hide left arrow on first modal & right arrowm on last modal
        if(modalLeft[i].getAttribute('for') === 'trigger-1') {
          modalLeft[i].style.visibility = 'hidden';
        } else if(modalRight[i].getAttribute('for') === 'trigger12') {
          modalRight[i].style.visibility = 'hidden';
        }

      // event to show modal window
        employeeDiv.addEventListener('click', function(e) {
          if(  e.target === this
            || e.target === clickedImage[i]
            || e.target === clickedName[i]
            || e.target === clickedEmail[i]
            || e.target === clickedCity[i]
            || e.target === clickedInfo[i]) {
            trigger[i].checked = true;
            overlayDiv.classList.add('overlayShow');
            window.scroll(0, 0);
            document.body.style.overflow = 'hidden';
          } // end if statement
        }); // end employeeDiv click event

      // close modal & remove overlay
        $('.modal').click(function(e) {
          if(e.target === modalClose[i]) {
            trigger[i].checked = false;
            overlayDiv.classList.remove('overlayShow');
            document.body.style.overflow = 'inherit';
          } // end if statement
        }); // end modal close

      // search by name or username
        searchInput.addEventListener('keyup', function(e) {
          let searchValue = searchInput.value;
          if(  userName.search(new RegExp(searchValue, 'i')) < 0
            && firstName.search(new RegExp(searchValue, 'i')) < 0
            && lastName.search(new RegExp(searchValue, 'i')) < 0) {
              $(employeeDiv).hide();
           } else {
             $(employeeDiv).show();
           } // end if statement for search

          // no users found message
           let hiddenQty = document.querySelectorAll('.employeeDiv[style^="display"]');
           let hidden = hiddenQty.length;
           const noUsers = document.querySelector('.noUsers');
           if(data.results.length === hidden) {
             noUsers.style.visibility = 'visible';
           } else {
             noUsers.style.visibility = 'hidden';
           } // end if statement - no users found message
        }); // end keyup event for search
      } // end for loop
    } // end success function
  }); // end ajax call
}); // end document ready
