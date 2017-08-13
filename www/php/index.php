<!DOCTYPE html>
<html>
	<head>
		<!--Script loads, and attempts to redirect. If it fails, then the PHP gives you a link to click to redirect you.-->
		<!--But the JS should do it automatically.-->

		<script>
			const redirectMe = function(){
				window.location = "markup/index.min.html";
			}
			document.write("Redirecting you to index.min.html...");
			redirectMe();
		</script>
		<?php
			echo "You should momentarily be redirected to index.min.html. "
			echo "<br>";
			echo "If you are not, click this link:";
			echo "<br>";
			echo "<a href = 'markup/index.min.html'> index.min.html </a>";
		?>
	</head>
	<body>
	</body>
</html>