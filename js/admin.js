document.addEventListener('DOMContentLoaded', function () {
    const campaignList = document.getElementById('campaignList');

    // Fetch pending campaigns from the server and display them
    fetch('/admin/campaigns')
        .then(response => response.json())
        .then(data => {
            data.campaigns.forEach(campaign => {
                addCampaignToList(campaign.id, campaign.title, campaign.description, campaign.approved);
            });
        })
        .catch(error => console.error('Error fetching pending campaigns:', error));

    function addCampaignToList(campaignId, title, description, approved) {
        const campaignItem = document.createElement('div');
        campaignItem.classList.add('campaign-item');
        campaignItem.innerHTML = `
            <div class="campaign-content">
                <strong>Title:</strong> ${title}<br>
                <strong>Description:</strong> ${description}<br>
                <strong>Status:</strong> ${approved ? 'Approved' : 'Admin Approval Needed'}<br>
                <button class="approve-btn" data-campaign-id="${campaignId}">Approve</button>
                <button class="deny-btn" data-campaign-id="${campaignId}">Deny</button>
            </div>`;
        campaignList.appendChild(campaignItem);

        // Add event listeners for approve and deny buttons
        const approveBtn = campaignItem.querySelector('.approve-btn');
        const denyBtn = campaignItem.querySelector('.deny-btn');

        approveBtn.addEventListener('click', function () {
            const campaignId = this.getAttribute('data-campaign-id');
            approveCampaign(campaignId);
        });

        denyBtn.addEventListener('click', function () {
            const campaignId = this.getAttribute('data-campaign-id');
            denyCampaign(campaignId);
        });
    }

    function approveCampaign(campaignId) {
        fetch('/admin/approve_campaign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ campaignId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Refresh the page after approval
        })
        .catch(error => console.error('Error approving campaign:', error));
    }

    function denyCampaign(campaignId) {
        fetch('/admin/deny_campaign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ campaignId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload(); // Refresh the page after denial
        })
        .catch(error => console.error('Error denying campaign:', error));
    }
});
