

// // gets the set up button that will toggle the set up container element
// const openSetUpBtn  = document.querySelector('#open-set-up-btn').innerHTML;
// console.log(openSetUpBtn);



 function app(){

        
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);


        // gets the button that displays the profile menu dropdown
        const profileMenuTrigger = document.querySelector('#Profile-btn');

        // gets the profile menu dropdown
        const profileMenu = document.querySelector('#Profile-menu');

       // get the all the profile-menu_item
       const profileMenuItems = profileMenu.querySelectorAll('[role="menuitem"]');

       // get the setup display button
       const setupDisplayBtn = document.querySelector('#Setup-display-btn');

       //get the svg arrow icons
       const arrowUp = document.querySelector('.arrowup');

       const arrowDown = document.querySelector('.arrowdown');

       // gets the set up container element which contains the various setup option 
       const setUpConatainer  = document.querySelector('.setup-container');

       

       // get all the setupMenu items
       const customiseMenuListItems = setUpConatainer.querySelectorAll('.customise-title');

      


       // gets the set up details for all the various setupMenu itmes 
       const customiseMenuItems = document.querySelectorAll('.customise-menu-item');


       // gets the set up details for all the various setupMenu itmes 
       const checkButton = document.querySelectorAll('.check-btn');

   

       //convert the nodelist into an array
       const customiseMenuItemsArray = [...customiseMenuItems]

       const customiseMenuListItemsArray = [...customiseMenuListItems]

       //get the completedTask btn
       const completedBtn = document.querySelectorAll('.completed');


       //get the completedTask btn
       const notCompletedBtn = document.querySelectorAll('.not-completed');

        //get the completedTask btn
        const spinnerBtn = document.querySelectorAll('.spinner');

       const completedBtnArray = [...completedBtn];

       
       const notCompletedBtnArray = [...notCompletedBtn]

       const checkButtonArray = [...checkButton]
     
     function handleProfileMenuToggle(){

        // checks if the aria expanded  atrribute of the button and set a value to it
        // function setAriaExpanded(){

            // get the value of aria-expanded of the profileMenu button
            const isExpanded = profileMenuTrigger.attributes['aria-expanded'].value === 'true';
 
            // checks if the button is expanded or not
            if(isExpanded){
                closeProfileMenu()
            }
            else{
                openProfileMenu();
            }
           
        toggleMenu()
     
     }

     profileMenu.addEventListener('keyup', (event)=>{
        if(event.key === 'Escape'){
            toggleMenu()               
        }
    })

    function handleProfileMenuArrowKeyPress(event,profileMenuItemIndex){

        // length of profile menu item 
        const profileMenuItemLength = profileMenuItems.length - 1
       
        // checks if we are at the last profile menu item
        const isLastProfileMenuItem = profileMenuItemIndex === profileMenuItemLength ;

        
         // checks if we are at the first profile menu item
         const isFirstProfileMenuItem = profileMenuItemIndex === 0;

        //  next profile menu item
        const nextProfileMenuItem = profileMenuItems.item(profileMenuItemIndex + 1);
        

          //  previous profile menu item
          const previousProfileMenuItem = profileMenuItems.item(profileMenuItemIndex - 1);


        //  if the user click on ArrowRight or ArrowDown
        if(event.key === "ArrowRight" || event.key === 'ArrowDown'){

            //  if user is on the last profile menu item return focus to the first profile menu item
            if(isLastProfileMenuItem){

                profileMenuItems.item(0).focus()
                return
            }

            nextProfileMenuItem.focus()
            
        }

          //  if the user click on ArrowLeft or ArrowUp
          if(event.key === "ArrowLeft" || event.key === 'ArrowUp'){

            //  if user is on the last profile menu item return focus to the first profile menu item
            if(isFirstProfileMenuItem){

                profileMenuItems.item(profileMenuItemLength ).focus();
               
                return
            }
            previousProfileMenuItem.focus();
           
        }


    }
   


    function toggleMenu(){
        
          // add show-menu(which toggle the button) class to the profile menu 
          profileMenu.classList.toggle('show-menu');
    
          profileMenuItems.forEach((profileMenuItem, profileMenuItemIndex) => {

            profileMenuItem.addEventListener('keyup', (event)=>{

                handleProfileMenuArrowKeyPress(event, profileMenuItemIndex)
            } );
          })


    }

     function openProfileMenu(){   
        // set the aria expanded of the button to true
        profileMenuTrigger.ariaExpanded = 'true';   
    }

    function closeProfileMenu(){

        // set the aria expanded of the button to true
        profileMenuTrigger.ariaExpanded = 'false';  

        // set focus on the profilMenuTrigger ones the profile menu is closed
        profileMenuTrigger.focus()
    }

     profileMenuTrigger.addEventListener('click', handleProfileMenuToggle);


    function CustomiseMenuToggle(){

        customiseMenuListItemsArray.forEach((customiseMenuItems, index)=>{ 

            function customiseMenuItemToggle(){
                customiseMenuItemsArray[index].classList.toggle('flex-display'); 
            }

            customiseMenuItems.addEventListener('click', customiseMenuItemToggle)
            })


           

            let progressBarValue = document.querySelector('.progress-bar').value;

            
            let counter = Number(document.querySelector('.counter').innerHTML);

            checkButtonArray.forEach((checkButton, checkButtonIndex) =>{
                
                const nextCheckButtonIndex = checkButtonIndex + 1;
                
                function handleDoneOrNotDone(){
   
                    const isDone = checkButton.classList.contains('done');
                    
                    if(isDone){
                        handleNotDone()
                        
                    }

                    else{
                        handleDone()
                    }
                }

                function handleDone(){

                        progressBarValue += 14.4;

                        counter += 1;
                    
                        notCompletedBtnArray[checkButtonIndex].classList.add('hidden');

                        spinnerBtn[checkButtonIndex].classList.remove('hidden');

                        setTimeout(handleDoneTimeout, 3000)

                        function handleDoneTimeout(){

                            spinnerBtn[checkButtonIndex].classList.add('hidden');

                            completedBtnArray[checkButtonIndex].classList.remove('hidden');
                            
                            document.querySelector('.counter').innerHTML = counter;

                            document.querySelector('.progress-bar').value = `${progressBarValue}`;

                            checkButton.classList.add('done');

                            customiseMenuItemsArray[checkButtonIndex].classList.remove('flex-display'); 

                            customiseMenuItemsArray[nextCheckButtonIndex].classList.add('flex-display'); 
                            
                        }
                }

                function counterDecrease(){
                    // let counter = Number(document.querySelector('.counter').innerHTML);
                    if(counter == 0){
                        return
                    }
                    else{
                        counter -= 1
                        return counter
                    }
                }

                function handleNotDone(){
                    progressBarValue -= 14.4;

                    counterDecrease()
                
                    completedBtnArray[checkButtonIndex].classList.add('hidden');

                    spinnerBtn[checkButtonIndex].classList.remove('hidden');

                    setTimeout(handleNotDoneTimeout, 3000)

                    function handleNotDoneTimeout(){
                        
                        spinnerBtn[checkButtonIndex].classList.add('hidden');
                        
                        notCompletedBtnArray[checkButtonIndex].classList.remove('hidden');

                        checkButton.classList.remove('done')            
                        
                        document.querySelector('.counter').innerHTML = counter;

                        document.querySelector('.progress-bar').value = `${progressBarValue}`;

                        customiseMenuItemsArray[checkButtonIndex].classList.add('flex-display'); 

                        customiseMenuItemsArray[nextCheckButtonIndex].classList.remove('flex-display'); 
                    }
                }

                checkButton.addEventListener('click', handleDoneOrNotDone)
            })

        }
    CustomiseMenuToggle()

    function handleSetupDisplay(){

        // gets the expanded state
        const isExpanded = setupDisplayBtn.attributes['aria-expanded'].value === 'true';
    
    
        // set the expanded state no false if isExpanded === true
        if(isExpanded){
    
            setupDisplayBtn.ariaExpanded = 'false';
    
            arrowUp.style.display = 'block'
    
            arrowDown.style.display = 'none';
            
        }
    
            // set the expanded state no true if isExpanded === false
        else{
            
            customiseMenuItems.item(0).classList.add('flex-display')

            setupDisplayBtn.ariaExpanded = 'true';
    
            arrowUp.style.display = 'none';
    
            arrowDown.style.display = 'block'
    
        }
    
        // toggles the setup container
        setUpConatainer.classList.toggle('show-menu');
    
        }

    setupDisplayBtn.addEventListener('click', handleSetupDisplay);


         
    function notificationCardToggle(){

        // gets the button that displays the notification menu dropdown
        const btnNotificationBell = document.querySelector('.btn-navbar-bell-icon');

        // gets the notification menu dropdown 
        const notificationMenu = document.querySelector('.notification-menu');

        // a click event on the notification bell to toggle the notification menu 
        btnNotificationBell.addEventListener('click',()=>{
            
            btnNotificationBell.focus();

            // when the profile placeholder is click, it addd show-menu class to it
            notificationMenu.classList.toggle('show-menu');
        
        })

    }

    notificationCardToggle();



    function subscriptionaCardRemove(){

        // gets the subscription close button element
        const subscriptionBtn  = document.querySelector('#Subscription_close');

        // gets the subscription element
        const subscription  = document.querySelector('#Subscription');

        subscriptionBtn.addEventListener('click', ()=>{
            
            // set the display of the subscription card to none
            subscription.style.display = 'none';
        })

    }

    subscriptionaCardRemove();

}

 app()   
       