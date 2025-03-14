document.addEventListener('DOMContentLoaded', function() {
    const cursorFollower = document.getElementById('cursor-follower');
    const letterContainer = document.getElementById('letter-container');
    const choiceButtons = document.getElementById('choice-buttons');
    
    // Initialize coin counter
    let totalCoins = 0;
    
    // Create coin counter element
    const coinCounter = document.createElement('div');
    coinCounter.className = 'coin-counter';
    
    // Create counter text
    const counterText = document.createElement('span');
    counterText.textContent = 'gold: ';
    
    // Create counter value
    const counterValue = document.createElement('span');
    counterValue.className = 'coin-counter-value';
    counterValue.textContent = '0';
    
    // Assemble counter
    coinCounter.appendChild(counterText);
    coinCounter.appendChild(counterValue);
    
    // Add counter to body
    document.body.appendChild(coinCounter);
    
    // Function to update coin counter
    function updateCoinCounter(coinsAdded) {
        totalCoins += coinsAdded;
        counterValue.textContent = totalCoins;
    }
    
    // Letter content - each line will be shown one at a time
    const letterLines = [
        "hi owen",
        "happy st. patrick's day!",
        "you're like a pot of gold, if gold was wonderful thoughts and things to say",
        "so many of them all stuffed together in one person",
        "i'm so lucky to know you!!!!",
        "i'm lucky we ended up at columbia",
        "and lucky we were in 1004 together",
        "i'm lucky you like coronas and chess and riverdale",
        "lucky to have another summer to look forward to",
        "i'm lucky to learn from and with you",
        "i'm lucky to make stuff with you",
        "make",
        "hehehe",
        "i can't wait to see you!!!!",
        "and i have an important question to ask...",
        "will you be my leprechaun?"
    ];
    
    let currentLineIndex = 0;
    
    // Variables for cursor follower
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update mouse position on mouse move
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop for smooth follower movement
    function animateFollower() {
        // Calculate the distance between mouse and follower
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        // Move the follower a fraction of the distance (creates lag effect)
        followerX += dx * 0.1;
        followerY += dy * 0.1;
        
        // Apply the position to the follower element
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        // Continue the animation loop
        requestAnimationFrame(animateFollower);
    }
    
    // Start the animation loop
    animateFollower();
    
    // Function to create falling coins
    function createFallingCoin(x, y) {
        const coin = document.createElement('div');
        coin.className = 'coin';
        
        const coinImg = document.createElement('img');
        coinImg.src = 'coin.png';
        coinImg.alt = 'Gold Coin';
        
        coin.appendChild(coinImg);
        document.body.appendChild(coin);
        
        // Set initial position
        coin.style.left = x + 'px';
        coin.style.top = y + 'px';
        
        // Random horizontal velocity
        const horizontalVelocity = (Math.random() - 0.5) * 8;
        
        // Random rotation speed
        const rotationSpeed = 0.5 + Math.random() * 1.5;
        coin.style.animation = `spin ${rotationSpeed}s linear infinite`;
        
        // Physics variables
        let verticalVelocity = -5 - Math.random() * 5; // Initial upward velocity
        const gravity = 0.5;
        let posX = x;
        let posY = y;
        
        function animateCoin() {
            // Apply gravity
            verticalVelocity += gravity;
            
            // Update position
            posX += horizontalVelocity;
            posY += verticalVelocity;
            
            // Apply position
            coin.style.left = posX + 'px';
            coin.style.top = posY + 'px';
            
            // Check if coin is below screen
            if (posY > window.innerHeight + 100) {
                coin.remove();
                return;
            }
            
            // Continue animation
            requestAnimationFrame(animateCoin);
        }
        
        // Start animation
        animateCoin();
    }
    
    // Function to create exploding hearts
    function createExplodingHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        const heartImg = document.createElement('img');
        heartImg.src = 'heart.png';
        heartImg.alt = 'Heart';
        
        heart.appendChild(heartImg);
        document.body.appendChild(heart);
        
        // Set initial position
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        
        // Random horizontal velocity (more spread out than coins)
        const horizontalVelocity = (Math.random() - 0.5) * 12;
        
        // Random rotation speed
        const rotationSpeed = 0.5 + Math.random() * 2;
        heart.style.animation = `heartBeat ${rotationSpeed}s linear infinite`;
        
        // Physics variables
        let verticalVelocity = -8 - Math.random() * 8; // Stronger initial upward velocity
        const gravity = 0.4; // Slightly less gravity for floating effect
        let posX = x;
        let posY = y;
        
        function animateHeart() {
            // Apply gravity
            verticalVelocity += gravity;
            
            // Update position
            posX += horizontalVelocity;
            posY += verticalVelocity;
            
            // Apply position
            heart.style.left = posX + 'px';
            heart.style.top = posY + 'px';
            
            // Check if heart is below screen
            if (posY > window.innerHeight + 100) {
                heart.remove();
                return;
            }
            
            // Continue animation
            requestAnimationFrame(animateHeart);
        }
        
        // Start animation
        animateHeart();
    }
    
    // Create coins on click
    document.addEventListener('click', function(e) {
        // Create multiple coins for a cascade effect
        const numCoins = 3 + Math.floor(Math.random() * 3); // 3-5 coins
        
        for (let i = 0; i < numCoins; i++) {
            // Small delay between each coin
            setTimeout(() => {
                createFallingCoin(e.clientX, e.clientY);
            }, i * 50);
        }
        
        // Update coin counter
        updateCoinCounter(numCoins);
    });
    
    // Function to create a letter line
    function createLetterLine(text, isLast = false) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'letter-line';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'letter-text';
        textSpan.textContent = text;
        lineDiv.appendChild(textSpan);
        
        if (!isLast) {
            const arrowSpan = document.createElement('span');
            arrowSpan.className = 'next-arrow';
            arrowSpan.innerHTML = '&rarr;'; // Right arrow
            arrowSpan.addEventListener('click', advanceToNextLine);
            lineDiv.appendChild(arrowSpan);
        }
        
        letterContainer.appendChild(lineDiv);
        
        // Adjust container width based on text width
        setTimeout(() => {
            const textWidth = textSpan.offsetWidth;
            const arrowWidth = isLast ? 0 : 46; // Approximate width of arrow + margin
            
            // Set minimum width to accommodate text and arrow
            lineDiv.style.minWidth = (textWidth + arrowWidth) + 'px';
            
            // Center the line div
            lineDiv.style.left = '50%';
            lineDiv.style.transform = 'translateX(-50%)';
        }, 10);
        
        return lineDiv;
    }
    
    // Function to advance to the next line
    function advanceToNextLine() {
        // Get current line and mark it for exit
        const currentLine = document.querySelector('.letter-line.active');
        if (currentLine) {
            currentLine.classList.remove('active');
            currentLine.classList.add('exit-left');
            
            // Remove after animation completes
            setTimeout(() => {
                currentLine.remove();
            }, 500);
        }
        
        currentLineIndex++;
        
        if (currentLineIndex < letterLines.length) {
            // Show next line
            const isLast = currentLineIndex === letterLines.length - 1;
            const nextLine = createLetterLine(letterLines[currentLineIndex], isLast);
            
            // Delay to allow exit animation to start
            setTimeout(() => {
                nextLine.classList.add('active');
                
                // If it's the last line, show the choice buttons
                if (isLast) {
                    setTimeout(() => {
                        choiceButtons.style.display = 'flex';
                    }, 1000);
                }
            }, 100);
        }
    }
    
    // Function to create and animate the pot of gold
    function createPotOfGold() {
        // Create container for pot of gold
        const potContainer = document.createElement('div');
        potContainer.className = 'pot-of-gold';
        
        // Create image element
        const potImg = document.createElement('img');
        potImg.src = 'pot of gold svg.png'; // Make sure this file exists
        potImg.alt = 'Pot of Gold';
        
        // Add image to container
        potContainer.appendChild(potImg);
        
        // Add click event to pot of gold
        potContainer.addEventListener('click', function(e) {
            // Get position of pot for heart explosion
            const rect = potContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Create exploding hearts
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createExplodingHeart(centerX, centerY);
                }, i * 50);
            }
            
            // Slide everything away
            setTimeout(() => {
                // Add exit animation to celebration container
                const celebrationContainer = document.querySelector('.celebration-container');
                celebrationContainer.classList.add('exit-up');
                
                // Show final message after elements have slid away
                setTimeout(() => {
                    // Clear container
                    letterContainer.innerHTML = '';
                    
                    // Create final message container
                    const finalContainer = document.createElement('div');
                    finalContainer.className = 'final-message';
                    
                    // Add "Love, Caroline" text
                    const signatureText = document.createElement('div');
                    signatureText.className = 'signature-text';
                    signatureText.textContent = 'love, caroline';
                    
                    // Add coin count to final message (but don't display it)
                    const coinCountText = document.createElement('div');
                    coinCountText.style.display = 'none'; // Hide this element
                    
                    // Create back to start button
                    const backButton = document.createElement('button');
                    backButton.className = 'back-button';
                    backButton.textContent = 'again!!!';
                    backButton.addEventListener('click', function() {
                        window.location.reload();
                    });
                    
                    // Add elements to container
                    finalContainer.appendChild(signatureText);
                    finalContainer.appendChild(coinCountText);
                    finalContainer.appendChild(backButton);
                    letterContainer.appendChild(finalContainer);
                    
                    // Animate in the final message
                    setTimeout(() => {
                        finalContainer.classList.add('active');
                    }, 100);
                }, 800);
            }, 1000);
        });
        
        // Add container to the letter container
        letterContainer.appendChild(potContainer);
        
        // Start the animation
        setTimeout(() => {
            potContainer.classList.add('active');
        }, 100);
    }
    
    // Initialize with the first line
    const firstLine = createLetterLine(letterLines[0]);
    setTimeout(() => {
        firstLine.classList.add('active');
    }, 500);
    
    // Set up choice buttons
    document.getElementById('yes-button').addEventListener('click', function() {
        // Clear letter container
        letterContainer.innerHTML = '';
        
        // Hide choice buttons
        choiceButtons.style.display = 'none';
        
        // Create container for celebration content
        const celebrationContainer = document.createElement('div');
        celebrationContainer.className = 'celebration-container';
        letterContainer.appendChild(celebrationContainer);
        
        // Show thank you message
        const thankYouLine = document.createElement('div');
        thankYouLine.className = 'letter-line';
        thankYouLine.innerHTML = '<span class="letter-text" style="font-size: 40px;">yippeeeeee</span>';
        celebrationContainer.appendChild(thankYouLine);
        
        setTimeout(() => {
            thankYouLine.classList.add('active');
            
            // Create a lot of celebratory coins
            const celebrationCoins = 30;
            for (let i = 0; i < celebrationCoins; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * 100;
                    createFallingCoin(x, y);
                }, i * 100);
            }
            
            // Update coin counter for celebration coins
            updateCoinCounter(celebrationCoins);
            
            // Create pot of gold immediately but keep it invisible
            createPotOfGold();
            
            // Get the pot of gold element and add a longer, smoother transition
            const potOfGold = document.querySelector('.pot-of-gold');
            if (potOfGold) {
                potOfGold.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
                
                // Make it visible after a delay
                setTimeout(() => {
                    potOfGold.classList.add('active');
                }, 1000);
            }
        }, 100);
    });
    
    document.getElementById('no-button').addEventListener('click', function() {
        // Make the No button run away when hovered
        this.style.position = 'absolute';
        this.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        this.style.top = Math.random() * (window.innerHeight - 200) + 'px';
    });
});
