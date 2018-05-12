/**
 * This is the Twitch API Key workaround
 * https://wind-bow.glitch.me/twitch-api
 */

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
};
const channels = {
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
    const userChannel = (ele) => {
            const attr = document.querySelector(".userInfo"),
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
                    if (data.status === null) {
                        attr.innerHTML += "<div class='row padIt border-bottom'><div class='col-3'><img class='userLogo img-fluid' src='" + data.logo + "' alt=''></div><div class='col-5'><span class='userName'>" + data.display_name + "<br>No Status</span></div><div class='col-4 my-auto'><span class='offline'>Offline</span></div></div>";
                    } else {
                        attr.innerHTML += "<div class='row padIt border-bottom'><div class='col-3'><img class='userLogo img-fluid' src='" + data.logo + "' alt=''></div><div class='col-5'><span class='userName'>" + data.display_name + "<br>\"" + data.status.substring(0, 16).concat("...") + "\"</span></div><div class='col-4 my-auto'><span class='offline'>Offline</span></div></div>";
                    }
                }
            });
        },
        getJson = () => {
            Object.keys(streams).forEach((ele) => {
                const attr = document.querySelector(".userInfo"),
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
                            const onlineAttr1 = "<div class='row padIt border-bottom'><div class='col-3'><img class='userLogo img-fluid' src='" + data.stream.channel.logo,
                                onlineAttr2 = "' alt=''></div><div class='col-5'><span class='userName'>" + data.stream.channel.display_name + "<br>\"" + data.stream.channel.status.substring(0, 16).concat("..."),
                                onlineAttr3 = "\"</span></div><div class='col-4'><span class='userLink'><a class='btn' href='" + data.stream.channel.url + "' target='_blank'>Online</a></span></div></div>",
                                onlineAttr = onlineAttr1.concat(onlineAttr2).concat(onlineAttr3);
                            attr.innerHTML += onlineAttr;
                        } else {
                            userChannel(ele);
                        }
                    }
                });

            });
        };

    getJson();

});
