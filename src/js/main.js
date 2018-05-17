/**
 * This is the Twitch API Key workaround
 * https://wind-bow.glitch.me/twitch-api
 */

// Objects for Streams and Channels of users
const streams = {
        overwatch: "/streams/OverWatch",
        cuppcaake: "/streams/Cuppcaake",
        adam13531: "/streams/Adam13531",
        theOddOne: "/streams/TSM_TheOddOne",
        heather1337: "/streams/Heather1337",
        ninja: "/streams/Ninja",
        creeesart: "/streams/Creeesart",
        jukes: "/streams/jukes",
        drlupo: "/streams/DrLupo"
    },
    channels = {
        overwatch: "/channels/OverWatch",
        cuppcaake: "/channels/Cuppcaake",
        adam13531: "/channels/Adam13531",
        theOddOne: "/channels/TSM_TheOddOne",
        heather1337: "/channels/Heather1337",
        ninja: "/channels/Ninja",
        creeesart: "/channels/Creeesart",
        jukes: "/channels/jukes",
        drlupo: "/channels/DrLupo"
    },
    dataUrl = "https://wind-bow.glitch.me/twitch-api";


$(document).ready(() => {

    // Get JSON Data for All users offline and without status using /channels
    const userChannel = (ele) => {
            const allUserAttr = document.querySelector(".userInfo"),
                offlineUserAttr = document.querySelector(".offlineUserInfo"),
                chanUrl = dataUrl.concat(channels[ele]);

            $.ajax({
                type: "GET",
                url: chanUrl,
                async: false,
                beforeSend: (xhr) => {
                    if (xhr && xhr.overrideMimeType) {
                        xhr.overrideMimeType("application/json;charset=utf-8");
                    }
                },
                dataType: "json",
                success: (data) => {
                    const offlineAttr1 = "<div class='row padIt border-bottom'><div class='col-3'><div class='outerLogo'><img class='userLogo img-fluid' src='" + data.logo,
                        offlineAttr2 = "' alt=''></div></div><div class='col-6'><span class='userName'>" + data.display_name,
                        offlineAttrNoStatus = "<br>No Status</span></div><div class='col-3 my-auto'><span class='offline pl-1'>Offline</span></div></div>";
                    if (data.status === null) {
                        allUserAttr.innerHTML += offlineAttr1.concat(offlineAttr2).concat(offlineAttrNoStatus);
                        offlineUserAttr.innerHTML += offlineAttr1.concat(offlineAttr2).concat(offlineAttrNoStatus);
                    } else {
                        const offlineAttrStatus = "<br>\"" + data.status.substring(0, 16).concat("...") + "\"</span></div><div class='col-3 my-auto'><span class='offline pl-1'>Offline</span></div></div>";
                        allUserAttr.innerHTML += offlineAttr1.concat(offlineAttr2).concat(offlineAttrStatus);
                        offlineUserAttr.innerHTML += offlineAttr1.concat(offlineAttr2).concat(offlineAttrStatus);
                    }
                }
            });
        },

        // Get JSON Data for All users tab-pane using /streams if null, then userChannel()
        getJson = () => {
            Object.keys(streams).forEach((ele) => {
                const allUserAttr = document.querySelector(".userInfo"),
                    onlineUserAttr = document.querySelector(".onlineUserInfo"),
                    jsonUrl = dataUrl.concat(streams[ele]);

                $.ajax({
                    type: "GET",
                    url: jsonUrl,
                    async: false,
                    beforeSend: (xhr) => {
                        if (xhr && xhr.overrideMimeType) {
                            xhr.overrideMimeType("application/json;charset=utf-8");
                        }
                    },
                    dataType: "json",
                    success: (data) => {
                        if (data.stream) {
                            const onlineAttr1 = "<div class='row padIt border-bottom'><div class='col-3'><div class='outerLogo'><img class='userLogo img-fluid' src='" + data.stream.channel.logo,
                                onlineAttr2 = "' alt=''></div></div><div class='col-6'><span class='userName'>" + data.stream.channel.display_name + "<br>\"" + data.stream.channel.status.substring(0, 15).concat("..."),
                                onlineAttr3 = "\"</span></div><div class='col-3 my-auto'><span class='userLink'><a class='myButton' href='" + data.stream.channel.url + "' target='_blank'>Online</a></span></div></div>",
                                onlineAttr = onlineAttr1.concat(onlineAttr2).concat(onlineAttr3);
                            allUserAttr.innerHTML += onlineAttr;
                            onlineUserAttr.innerHTML += onlineAttr;
                        } else {
                            userChannel(ele);
                        }
                    }
                });

            });
        },

        // Constants to get value of search and button
        searchInputBtn = document.getElementById("searchBtn"),
        searchInputValue = document.getElementById("searchInput");

    // Fetch to get Json data from search
    const fetchSearchJson = (searchInput) => {
        const searchResultAttr = document.querySelector(".searchResults"),
            searchDataUrl = dataUrl.concat("/streams/").concat(searchInput),
            offlineNull = "<div class='container-fluid mx-auto'><div class='searchResults d-flex justify-content-center pb-3'><h5>User is Not found or Offline.</h5></div></div>";

        fetch(searchDataUrl).then((response) => response.json()).
            then((searchJson) => {

                if (searchJson.stream === null) {
                    searchResultAttr.innerHTML = offlineNull;
                } else {
                    const onlineAttr1 = "<div class='row padIt pb-4 border-bottom'><div class='col-3'><div class='outerLogo'><img class='userLogo img-fluid' src='" + searchJson.stream.channel.logo,
                        onlineAttr2 = "' alt=''></div></div><div class='col-6'><span class='userName'>" + searchJson.stream.channel.display_name + "<br>\"" + searchJson.stream.channel.status.substring(0, 15).concat("..."),
                        onlineAttr3 = "\"</span></div><div class='col-3 my-auto'><span class='userLink'><a class='myButton' href='" + searchJson.stream.channel.url + "' target='_blank'>Online</a></span></div></div>",
                        onlineAttr = onlineAttr1.concat(onlineAttr2).concat(onlineAttr3);

                    searchResultAttr.innerHTML = onlineAttr;
                }

            });
    };

    searchInputValue.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const searchInput = document.getElementById("searchInput").value;
            fetchSearchJson(searchInput);
        }
    });

    searchInputBtn.addEventListener("click", () => {
        const searchInput = document.getElementById("searchInput").value;
        fetchSearchJson(searchInput);
    });

    getJson();

});
