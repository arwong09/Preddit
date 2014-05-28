class Api::TilesController < ApplicationController
  def create
    @tile = Tile.new(tile_params)
    @user = User.find_by(username: params['target_name'])
    @tile.user_id = @user.id
    @tile.sender_id = Integer(params['sender_id'])
    p '########'*100
    p @tile
    if @tile.save
      render json: { tile: @tile }
    else
      render json: { errors: @tile.errors.full_messages }, status: 422
    end
  end

  def tile_params
    params.permit('title', 'url', 'author', 'domain', 'imgSrc', 'permalink', 'subreddit')
  end

  def show
    @user = User.find_by(username: params[:id])
    @tiles = Tile.where(user_id: @user.id)
    render json: { tiles: @tiles}
  end
end