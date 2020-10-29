/*
* GET home page.
*/
exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      let post  = req.body;
      let title= post.title;
      let desc=post.desc;

	
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');

		let file = req.files.uploaded_image;
		let img_name=file.name;

	  	 if(file.mimetype === "image/jpeg" ||file.mimetype === "image/png"||file.mimetype === "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)

	                return res.status(500).send(err);
      					let sql = "INSERT INTO `ubisoft`(`title`,`desc`,`image`) VALUES ('" + title + "','" + desc + "','" + img_name + "')";

    						let query = db.query(sql, function(err, result) {
							if(err)
								{
								//res.render('index');
								}
    							 res.redirect('/');

							});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }
 
};

exports.profile = function(req, res)
{
    let sql="SELECT * FROM `ubisoft` ";
    let total="SELECT COUNT(*) FROM `ubisoft`;";
	let size=0;
	db.query(total, function(err, result) {
		result = JSON.stringify(result);
		//console.log(result[13])
		size = parseInt(result[13] + result[14])
		//console.log(size)

		db.query(sql, function (err, result1) {

				res.render('profile.ejs', {data: JSON.stringify(result1), size: size});

		});
	});

};
