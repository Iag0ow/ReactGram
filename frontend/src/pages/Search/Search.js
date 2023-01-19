import "./Search.css";

import { useQuery } from "../../Hooks/useQuery.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../Hooks/useResetComponent";

import LikeContainer from "../../components/LikeContainer/LikeContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";

import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const search = useQuery();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = (photo = null) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Search;
