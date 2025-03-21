$(document).ready(function(){

    const buttonSearch = $('#btn-search');

    const elementProfileAvatar = $('.profile-avatar');
    const elementProfileName = $('.profile-name');
    const elementProfileUserName = $('.profile-username');
    const elementProfileRepos = $('#repos');
    const elementProfileFollowers = $('#followers');
    const elementProfileFollowing = $('#following');
    const elementProfileLink = $('.profile-link');

    buttonSearch.click(function(event){
        event.preventDefault();
        const user = $('#input-user').val().trim();

        if(user.length == 0) {
            alert('Por favor, insira um nome de usuário do GitHub.');
            return
        }

        const endpoint = `https://api.github.com/users/${user}`;

        fetch(endpoint)
        .then(function(response){
            if(!response.ok){
                throw new Error(`Usuário não encontrado ou erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(
            function(json){
            const profileAvatar = json.avatar_url;
            const profileName  = json.name;
            const profileUserName = json.login;
            const profileFollowers  = json.followers;
            const profileFollowing = json.following;
            const profileRepos = json.public_repos;
            const profileLink = json.html_url;

            elementProfileAvatar.attr({
                src: profileAvatar,
                alt: profileName
            });

                

            elementProfileName.html(`${profileName}`);

            elementProfileUserName.html(`@${profileUserName}`);

            elementProfileRepos.html(`${profileRepos}`);

            elementProfileFollowers.html(`${profileFollowers}`);

            elementProfileFollowing.html(`${profileFollowing}`);

            elementProfileLink.attr({
                href: profileLink,
                target: '_blank'
            });

        })
        .catch(function(error) {
            alert("Ocorreu um erro ao buscar o endereço, tente novamente mais tarde.");
        })
        .finally(function(){
            setTimeout(function() {
                buttonSearch.find('i').removeClass('d-none');
                buttonSearch.find('span').addClass('d-none');
            }, 1000);
        })
    });

});