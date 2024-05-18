document.addEventListener('DOMContentLoaded', function() {
    // Client-side validation for login form
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Validate email and password
        let email = this.email.value;
        let password = this.password.value;
        // Check if email and password are not empty and email format is valid
        if (!email.trim() || !password.trim() || !validateEmail(email)) {
            alert('Please enter a valid email and password');
            return;
        }
        // Submit the form if validation passes
        this.submit();
    });

    // Client-side validation for registration form
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Validate username, email, and password
        let username = this.username.value;
        let email = this.email.value;
        let password = this.password.value;
        // Check if all fields are not empty and email format is valid
        if (!username.trim() || !email.trim() || !password.trim() || !validateEmail(email)) {
            alert('Please enter a valid username, email, and password');
            return;
        }
        // Submit the form if validation passes
        this.submit();
    });

    // Function to validate email format
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const campaignList = document.getElementById('campaignList');

    // Fetch existing campaigns from the server and display them
    fetch('/campaigns')
        .then(response => response.json())
        .then(data => {
            data.campaigns.forEach(campaign => {
                addCampaignToList(campaign.title, campaign.description);
            });
        })
        .catch(error => console.error('Error fetching campaigns:', error));

    // Function to add a campaign to the campaign list
    function addCampaignToList(title, description) {
        const campaignItem = document.createElement('div');
        campaignItem.classList.add('campaign-item'); // Add a class for styling
        campaignItem.innerHTML = `
            <div class="campaign-content">
                <strong>Title:</strong> ${title}<br>
                <strong>Description:</strong> ${description}
            </div>`;
        campaignList.appendChild(campaignItem);
    }

    const form = document.getElementById('campaignForm');
    const titleInput = document.getElementById('campaignTitle');
    const descriptionInput = document.getElementById('campaignDescription');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        if (title.trim() !== '' && description.trim() !== '') {
            postCampaign(title, description);
            titleInput.value = '';
            descriptionInput.value = '';
        }
    });

    function postCampaign(title, description) {
        fetch('/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Add the newly posted campaign to the campaign list
                addCampaignToList(title, description);
            })
            .catch(error => console.error('Error:', error));
    }
});
