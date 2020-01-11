class MainController < ApplicationController
  def index
   @posts=Post.all
   @tags=Tag.all
   @categories=Category.all
  end





end
