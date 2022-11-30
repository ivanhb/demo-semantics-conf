

function get_pc_csv(fcsv, page) {
    $.ajax({
        url : fcsv,
        dataType: "text",
        success : function (fdata) {
            var json_data = $.csv.toObjects(fdata);
            json_data.forEach(function(entry) {
                var fname = entry["first name"].trim();
                var lname = entry["last name"].trim();
                var role = entry["role"].trim().toLowerCase();
                var affiliation = entry["affiliation"].trim();
                var country = entry["country"].trim();
                var email = entry["email"].trim();
                var webpage = entry["Web page"].trim();
                var image = "../img/person/"+entry["image"].trim();

                //add email
                var str_email = "";
                if ((email != "") && (email.includes("@"))) {
                  str_email = "<a href='mailto:"+email+"'>[[VAR]]</i></a>";
                }

                //add country
                var str_country = "";
                if (country != "") {
                  str_country = ", "+country;
                }

                if (page == "pc"){
                  if (role == "pc member") {
                    //var html_entry = "<li>"+fname+" "+lname+" ("+affiliation+str_country+") "+str_email.replace("[[VAR]]","<i class='bi bi-envelope-at'>")+"</li>";
                    // with no Email
                    var html_entry = "<li>"+fname+" "+lname+" ("+affiliation+str_country+")</li>";
                    $("#pc_members").append(html_entry);
                  }
                  if (role == "superchair") {
                    var lower_name = lname.toLowerCase();
                    // with Email
                    //var str_html = '<div class="row psc-mem"><div class="col-lg-3 mx-auto image-profile"><img src="'+image+'" class=" image-profile"></div><div class="col-lg-9 mx-auto profile-details"><b>'+fname+' '+lname+'</b><br/>'+affiliation+str_country+'<br/>'+str_email.replace("[[VAR]]",email)+'</div></div>';
                    // with no Email
                    var str_html = '<div class="row psc-mem"><div class="col-lg-3 mx-auto image-profile"><img src="'+image+'" class=" image-profile"></div><div class="col-lg-9 mx-auto profile-details"><b>'+fname+' '+lname+'</b><br/>'+affiliation+str_country+'<br/></div></div>';
                    $("#psc_members").append(str_html);
                  }

                }

            });
        }
    });
}

function get_oc_csv(fcsv, page) {
    $.ajax({
        url : fcsv,
        dataType: "text",
        success : function (fdata) {
          var json_data = $.csv.toObjects(fdata);
          json_data.forEach(function(entry) {
              //header: Conference Committee,Name,Email,Status,Contacted,Easychair,country,affiliation
              var conf_role = entry["Conference Committee"].trim();
              var name = entry["Name"].trim();
              var email = entry["Email"].trim();
              var affiliation = entry["affiliation"].trim();
              var country = entry["country"].trim();
              var image = "../img/person/"+entry["image"].trim();
              //add email
              var str_email = "";
              if ((email != "") && (email.includes("@"))) {
                str_email = "<a href='mailto:"+email+"'>[[VAR]]</i></a>";
              }

              var str_html = '<div class="row profile"><div class="col-lg-12 mx-auto"><div class="row"><div class="col-lg-3 mx-auto role-profile"><h4>'+conf_role+'</h4></div><div class="col-lg-9 mx-auto"><div class="row"><div class="col-lg-3 mx-auto image-profile"><img src="'+image+'" class=" image-profile"></div><div class="col-lg-9 mx-auto profile-details"><b>'+name+'</b><br/>'+affiliation+'<br/>'+country+'<br />'+str_email.replace("[[VAR]]",email)+'</div></div></div></div></div></div>';
              $("#oc_members").append(str_html);
          });
        }
    });
}

function build_pc(){
  get_pc_csv("/other/demo-semantics-conf/content/pc.csv", "pc");
}

function build_oc(){
  get_oc_csv("/other/demo-semantics-conf/content/oc.csv", "oc");
}
