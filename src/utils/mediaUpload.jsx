import { createClient } from "@supabase/supabase-js";

const anon_key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzb25obWtvbWdpYWlrc2Z2c251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTMwMzgsImV4cCI6MjA3NjU2OTAzOH0.FB6lZJbULKWW5S7APgGLhB3pAAilMXJDcNqMvqtdchs";
const supabase_url = "https://rsonhmkomgiaiksfvsnu.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

		const timestamp = new Date().getTime();
		const fileName = timestamp + file.name;

		supabase.storage
			.from("AudioImages")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then(() => {
				const publicUrl = supabase.storage.from("AudioImages").getPublicUrl(fileName)
					.data.publicUrl;
				resolve(publicUrl);
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}
