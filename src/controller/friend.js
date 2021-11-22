const FriendService=require('../service/friend')

class FriendController {
  async create(ctx, next) {
    const query = ctx.request.body
    const res=await FriendService.createFriend(query)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async list(ctx, next) {
    const query = ctx.request.body
    const res=await FriendService.friendList(query)
    ctx.body = {
      success: true,
      data: res.data,
      count:res.count
    }
  }

  async edit(ctx, next) {
    const query = ctx.request.body
    const res=await FriendService.editFriend(query)
    ctx.body = {
      success: true,
      data:res
    }
  }

  async editStatus(ctx,next) {
    const query = ctx.request.body    
    const res = await FriendService.editStatus(query)
    ctx.body = {
      success: true,
      data:res
    }

  }

  async deleted(ctx, next) {
    const query = ctx.request.query
    const res=await FriendService.deletedFriend(query)
    ctx.body = {
      success: true,
      data:res
    }
  }
}

module.exports = new FriendController();
