function Playlist (Xbmc)
{
    //Initialte child namespaces
    this.Video              = new VideoPlaylist(this);
    this.Audio              = new AudioPlaylist(this);

    //Namespace configuration
    var a_namespace         = new Array();
    a_namespace['video']    = 'VideoPlaylist';
    a_namespace['audio']    = 'AudioPlaylist';
    
    var a_media             = new Array();
    a_media[0]              = 'audio';
    a_media[1]              = 'video';

    //supporting methods
    this.isAllowedMedia = function (s_media)
    {
        return Xbmc.Helper.in_array(s_media, a_media);
    }

    this.getResponse = function (o_post)
    {
        o_post.media = (!o_post.media)? Xbmc.Player.getActivePlayer() : o_post.media ;

        if (!this.isAllowedMedia(o_post.media) || !o_post.method)
            return false;

        var o_result = Xbmc.post(a_namespace[o_post.media], o_post.method, o_post.parameter);

        if (o_post.boolResponse)
            return (o_result == "OK");
        else
            return (o_result)? o_result : false ;
    }

    //XBMC method implementations
    this.play = function (s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Play';
        o_post.boolResponse     = true;

        return this.getResponse(o_post);
    }

    this.skipPrevious = function (s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'SkipPrevious';
        o_post.boolResponse     = true;

        return this.getResponse(o_post);
    }

    this.skipNext = function (s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'SkipNext';
        o_post.boolResponse     = true;

        return this.getResponse(o_post);
    }

    this.getCurrentPlaylist = function (s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'GetItems';
        o_post.boolResponse     = false;

        return this.getResponse(o_post);
    }

        this.getItems = function (s_media)
        {
            var o_result = this.getCurrentPlaylist(s_media);
            return (!o_result.items)? false : o_result.items ;
        }

        this.getCurrentItem = function (s_media)
        {
            var o_result = this.getCurrentPlaylist(s_media);
            return (!o_result.current)? false : o_result.current ;
        }

        this.getItemCount = function (s_media)
        {
            var o_result = this.getCurrentPlaylist(s_media);
            return (!o_result.total)? false : o_result.total ;
        }

    this.shuffle = function (s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Shuffle';
        o_post.boolResponse     = true;

        return this.getResponse(o_post);
    }

    this.unShuffle = function (s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'UnShuffle';
        o_post.boolResponse     = true;

        return this.getResponse(o_post);
    }

    this.add = function (s_file, s_media)
    {
        var o_parameters        = new Object();
        o_parameters.playlist   = (s_media)? s_media : undefined ;
        o_parameters.file       = s_file;
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Add';
        o_post.boolResponse     = true;
        o_post.parameter        = o_parameters;

        return this.getResponse(o_post);
    }

    this.clear = function (s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Clear';
        o_post.boolResponse     = true;

        return this.getResponse(o_post);
    }

    //????
    this.create = function (s_file, s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Create';
        o_post.boolResponse     = true;
        o_post.parameter        = s_file;

        return this.getResponse(o_post);
    }

    //????
    this.destroy = function (s_file, s_media)
    {
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Destroy';
        o_post.boolResponse     = true;
        o_post.parameter        = s_file;

        return this.getResponse(o_post);
    }

    this.remove = function (i_item, s_media)
    {
        var o_parameters        = new Object();
        o_parameters.playlist   = s_media;
        o_parameters.item       = i_item;
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Remove';
        o_post.boolResponse     = true;
        o_post.parameter        = o_parameters;

        return this.getResponse(o_post);
    }

    this.swap = function (i_item1, i_item2, s_media)
    {
        var o_parameters        = new Object();
        o_parameters.playlist   = (s_media)? s_media : undefined ;
        o_parameters.item1      = i_item1;
        o_parameters.item2      = i_item2;
        var o_post              = new Object();
        o_post.media            = s_media;
        o_post.method           = 'Swap';
        o_post.boolResponse     = true;
        o_post.parameter        = o_parameters;

        return this.getResponse(o_post);
    }
}