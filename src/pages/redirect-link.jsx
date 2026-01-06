import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

const RedirectLink = () => {
  const {id} = useParams();

  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
   if (!loading && data) {
          fnStats();
      
          setTimeout(() => {
            window.location.replace(data.original_url);
          }, 100);
        }
      }, [loading, data]);
  if (loading) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }
if (data) {
    return (
      <div style={{textAlign: "center", marginTop: "50px", padding: "20px"}}>
        <p>Redirecting to destination...</p>
        <p style={{marginTop: "10px"}}>
          If not redirected, <a href={data.original_url} style={{color: "#36d7b7"}}>click here</a>
        </p>
      </div>
    );
  }

  return null;
};

export default RedirectLink;
