$(document).ready(function () {
    //const ethereumProvider = ethers.providers.getDefaultProvider('ropsten');
    const provider = new ethers.providers.EtherscanProvider('ropsten');
    const votingContractAddress = "0xc9741248cd1f99764516955278d692d1b0701002";
    const votingContractABI =
        [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "addCandidate",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint32"
                    }
                ],
                "name": "vote",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "candidatesCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint32"
                    }
                ],
                "name": "getCandidate",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint32"
                    }
                ],
                "name": "getVotes",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ];

    const votingContract = new ethers.Contract(votingContractAddress, votingContractABI, provider);

    showView("viewHome");

    $('#linkHome').click(function () {
        showView("viewHome");
    });

    $('#linkLogin').click(function () {
        showView("viewLogin");
    });

    $('#linkRegister').click(function () {
        showView("viewRegister");
    });

    $('#linkLogout').click(logout);

    $('#buttonLogin').click(login);
    $('#buttonRegister').click(register);

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
        const loggedIn = sessionStorage.jsonWallet;
        if (loggedIn) {
            $('.show-after-login').show();
            $('.hide-after-login').hide();
        } else {
            $('.show-after-login').hide();
            $('.hide-after-login').show();
        }
        if (viewName === 'viewHome')
            loadVotingResults();
    }

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () { $("#ajaxLoadingBox").fadeIn(200) },
        ajaxStop: function () { $("#ajaxLoadingBox").fadeOut(200) }
    });

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        });
    }

    function showError(errorMsg, err) {
        let msgDetails = "";
        if (err && err.responseJSON)
            msgDetails = err.responseJSON.errorMsg;
        $('#errorBox>p').html('Error: ' + errorMsg + msgDetails);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
    }

    function showProgressBox(percent) {
        let msg = "Wallet encryption / decryption ... " +
            Math.round(percent * 100) + "% complete";
        $('#progressBox').html(msg).show(100);
    }

    function hideProgressProgress() {
        $('#progressBox').hide(100);
    }

    async function login() {
        //TODO:
    }

    async function register() {
        //TODO:
        let username = $('#usernameRegister').val();
        let walletPassword = $('#passwordRegister').val();
        try {
            let wallet = ethers.Wallet.createRandom();
            let jsonWallet = await wallet.encrypt(walletPassword, {}, showProgressBox);
            let backendPassword = CryptoJS.HmacSHA256(username, walletPassword).toString();
            let result = await $.ajax({
                type: 'POST',
                url: `/register`,
                data: JSON.stringify({ username, password: backendPassword, jsonWallet }),
                contentType: 'application/json'
            });
            sessionStorage['username'] = username;
            sessionStorage['jsonWallet'] = jsonWallet;
            showView('viewHome');
            showInfo(`User "${username}" registered successfully.  Please save your mnemonics: <b>${wallet.mnemonic}</b>`);
        } catch (err) {
            showError("Cannot register user.", err);
        }
        finally {
            hideProgressProgress();
        }
    }

    async function loadVotingResults() {
        //TODO:
    }

    async function vote(candidateIndex, candidateName) {
        //TODO:
    }

    function logout() {
        //TODO:
    }

});


